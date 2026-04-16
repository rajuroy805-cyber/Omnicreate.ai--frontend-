import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight, Loader2, KeyRound } from 'lucide-react';

export default function Login({ setIsAuthenticated }: { setIsAuthenticated: (val: boolean) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  // Step 1: Handle Email/Password Submission
  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending OTP to email
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpScreen(true);
      // In a real app, you would call an API here to send the OTP email via Resend/Firebase
      console.log(`OTP sent to ${email}`);
    }, 1500);
  };

  // Step 2: Handle OTP Verification
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const enteredOtp = otp.join('');

    setTimeout(() => {
      // For demo: Accept '1234' as valid OTP or if it's the owner email
      if (enteredOtp === '1234' || email.toLowerCase() === 'bossrajuroy1122@omnicreate.ai') {
        if (email.toLowerCase() === 'bossrajuroy1122@omnicreate.ai') {
          localStorage.setItem('omnicreate_auth', 'owner');
        } else {
          localStorage.setItem('omnicreate_auth', 'user');
        }
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        alert("Invalid OTP! Please try again. (Hint: Use 1234 for demo)");
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Only allow 1 digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight">OmniCreate<span className="text-purple-400">.ai</span></span>
        </div>

        <div className="bg-[#13131a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          
          {!showOtpScreen ? (
            // ================= SCREEN 1: EMAIL & PASSWORD =================
            <>
              <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
              <p className="text-gray-400 mb-8">
                {isLogin ? 'Enter your details to access your workspace.' : 'Start creating AI magic for free.'}
              </p>

              <form onSubmit={handleInitialSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                {isLogin && (
                  <button 
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 rounded-xl font-medium flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  {isLogin ? 'Sign up for free' : 'Sign in'}
                </button>
              </div>
            </>
          ) : (
            // ================= SCREEN 2: OTP VERIFICATION =================
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 mx-auto">
                <KeyRound className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center">Check your email</h2>
              <p className="text-gray-400 mb-8 text-center text-sm">
                We've sent a 4-digit verification code to <br/>
                <span className="text-white font-medium">{email}</span>
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-center gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-14 h-14 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-colors"
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || otp.join('').length !== 4}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 rounded-xl font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Verify & Login'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-400">
                Didn't receive the code?{" "}
                <button 
                  onClick={() => alert("New OTP sent!")}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Resend
                </button>
              </div>
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowOtpScreen(false)}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  ← Back to login
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}