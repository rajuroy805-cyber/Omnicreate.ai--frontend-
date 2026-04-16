import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, ArrowRight, Loader2, ArrowLeft, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending OTP to email
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      alert("Password successfully reset! Please login with your new password.");
      navigate('/login');
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow 1 character
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight">OmniCreate<span className="text-purple-400">.ai</span></span>
        </div>

        <div className="bg-[#13131a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <button 
            onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
              <p className="text-gray-400 mb-8">
                Enter your email address and we'll send you a 4-digit OTP to reset your password.
              </p>

              <form onSubmit={handleSendOTP} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 rounded-xl font-medium flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
              <p className="text-gray-400 mb-8">
                We've sent a 4-digit code to <span className="text-white font-medium">{email}</span>
              </p>

              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <div className="flex justify-center gap-4 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-14 h-16 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || otp.some(d => d === '')}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 rounded-xl font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Code'}
                </button>

                <div className="text-center mt-4">
                  <button type="button" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                    Resend Code
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold mb-2">Create New Password</h2>
              <p className="text-gray-400 mb-8">
                Your new password must be different from previous used passwords.
              </p>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="password" 
                      required
                      minLength={8}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="password" 
                      required
                      minLength={8}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 rounded-xl font-medium flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}