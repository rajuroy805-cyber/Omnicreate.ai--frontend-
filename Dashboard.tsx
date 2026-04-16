import { useState, useRef } from 'react';
import { Video, Globe2, Film, Zap, Upload, Wand2, Loader2, Download, CheckCircle2, LogOut, History, Crown, CreditCard, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('image-to-video');
  const navigate = useNavigate();

  // User Data & Credits System
  const authType = localStorage.getItem('omnicreate_auth');
  const isOwner = authType === 'owner';
  const isVip = authType === 'vip';
  const hasUnlimited = isOwner || isVip;
  
  const [credits, setCredits] = useState(hasUnlimited ? 999999 : 5); // Owner/VIP gets unlimited, users get 5
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // History / Gallery System
  const [gallery, setGallery] = useState([
    { id: 1, type: 'video', url: '/demo-video.mp4', date: 'Just now', name: 'Neon Waves' }
  ]);

  // Simulation States
  const [status1, setStatus1] = useState('idle'); // idle, loading, done
  const [status2, setStatus2] = useState('idle');
  const [status3, setStatus3] = useState('idle');
  const [selectedStyle, setSelectedStyle] = useState('Studio Ghibli Style');
  
  // File Upload States
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideoName, setUploadedVideoName] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  
  // Refs for hidden file inputs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Credit Deduction Logic
  const deductCredit = () => {
    if (hasUnlimited) return true; // Owner and VIP never lose credits
    
    if (credits <= 0) {
      setShowUpgradeModal(true);
      return false;
    }
    setCredits(prev => prev - 1);
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('omnicreate_auth');
    navigate('/login');
  };

  const handleSimulate = (setStatus: (s: string) => void, type: string) => {
    if (!deductCredit()) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
      // Add to gallery history
      setGallery(prev => [{
        id: Date.now(),
        type: type,
        url: type === 'anime' ? '/hero-ai.png' : '/demo-video.mp4',
        date: 'Just now',
        name: `Generated ${type}`
      }, ...prev]);
    }, 4000);
  };

  const handleGenerateRealVideo = async () => {
    if (!imageInputRef.current?.files?.[0]) {
      alert("Please upload an image first!");
      return;
    }

    if (!deductCredit()) return;

    setStatus1('loading');

    try {
      const file = imageInputRef.current.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("https://omnicreate-ai.onrender.com/generate", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      
      setGeneratedVideoUrl(data.videoUrl);
      setStatus1('done');
      
      setGallery(prev => [{
        id: Date.now(),
        type: 'video',
        url: data.videoUrl,
        date: 'Just now',
        name: 'AI Video'
      }, ...prev]);

    } catch (error) {
      // Improved error message to explain why it's failing
      alert("Backend se connect nahi ho paya (https://your-backend-url/generate). Kyunki abhi humara backend server (Node.js) internet par live nahi hai. Abhi demo video dikha rahe hain.");
      
      setGeneratedVideoUrl('/demo-video.mp4');
      setStatus1('done');
      
      setGallery(prev => [{
        id: Date.now(),
        type: 'video',
        url: '/demo-video.mp4',
        date: 'Just now',
        name: 'Demo Video'
      }, ...prev]);
    }
  };

  const handleGenerateRealDubbing = async () => {
    if (!videoInputRef.current?.files?.[0]) {
      alert("Please upload a video first!");
      return;
    }

    if (!deductCredit()) return;

    setStatus2('loading');

    try {
      const file = videoInputRef.current.files[0];
      const formData = new FormData();
      formData.append("video", file);
      formData.append("targetLanguage", "Hindi");

      const res = await fetch("https://omnicreate-ai.onrender.com/dubbing", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Server error");
      await res.json();
      
      setStatus2('done');
      setGallery(prev => [{
        id: Date.now(),
        type: 'dubbing',
        url: '/demo-video.mp4',
        date: 'Just now',
        name: 'Dubbed Video (Hindi)'
      }, ...prev]);

    } catch (error) {
      alert("Backend offline. Showing demo video.");
      setStatus2('done');
      setGallery(prev => [{
        id: Date.now(),
        type: 'dubbing',
        url: '/demo-video.mp4',
        date: 'Just now',
        name: 'Demo Dub (Hindi)'
      }, ...prev]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideoName(file.name);
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.download = filename; 
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);

      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50';
      notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        <div>
          <p class="font-bold text-sm">Download Complete</p>
          <p class="text-xs opacity-90">File saved to your device.</p>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => document.body.removeChild(notification), 500);
      }, 3000);

    } catch (error) {
      console.error("Download failed:", error);
      window.open(url, '_blank');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'admin-panel':
        return (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  Admin Dashboard <Crown className="w-6 h-6 text-yellow-400" />
                </h2>
                <p className="text-gray-400">Manage your users and revenue.</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 px-6 py-3 rounded-2xl">
                <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-yellow-400">$345.88</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-400 mb-2">Total Users</p>
                <p className="text-3xl font-bold">1,248</p>
                <p className="text-xs text-green-400 mt-2">+12 today</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-400 mb-2">Active Pro Plans</p>
                <p className="text-3xl font-bold">142</p>
                <p className="text-xs text-green-400 mt-2">+3 today</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-400 mb-2">Videos Generated</p>
                <p className="text-3xl font-bold">8,405</p>
                <p className="text-xs text-green-400 mt-2">+124 today</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-400 mb-2">Server Cost Est.</p>
                <p className="text-3xl font-bold text-red-400">$42.50</p>
                <p className="text-xs text-red-400/70 mt-2">API Usage</p>
              </div>
            </div>

            {/* Recent Pro Users Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h3 className="font-bold text-lg">Recent Pro Subscribers</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-xs uppercase text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 font-medium">User Email</th>
                      <th className="px-6 py-4 font-medium">Plan</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Joined Date</th>
                      <th className="px-6 py-4 font-medium">Generations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {[
                      { email: 'sarah.j@gmail.com', plan: 'Yearly ($23.88)', status: 'Active', date: 'Today, 10:42 AM', gens: 45 },
                      { email: 'mike.creator@yahoo.com', plan: 'Monthly ($4.99)', status: 'Active', date: 'Yesterday', gens: 12 },
                      { email: 'alex_designs@hotmail.com', plan: 'Yearly ($23.88)', status: 'Active', date: '2 days ago', gens: 189 },
                      { email: 'priya.s@gmail.com', plan: 'Monthly ($4.99)', status: 'Cancelled', date: '1 week ago', gens: 5 },
                      { email: 'david.wu@company.com', plan: 'Yearly ($23.88)', status: 'Active', date: '1 week ago', gens: 412 },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium">{user.email}</td>
                        <td className="px-6 py-4 text-purple-400">{user.plan}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{user.date}</td>
                        <td className="px-6 py-4">{user.gens}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Note: This is a demo view. In production, this will sync with your Stripe/Razorpay account.</p>
            </div>
          </div>
        );
      case 'image-to-video':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-2">Image to Video</h2>
            <p className="text-gray-400 mb-8">Transform any static image into a cinematic video.</p>
            
            {status1 === 'idle' && (
              <>
                <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/png, image/jpeg, image/webp" className="hidden" />
                
                <div onClick={() => imageInputRef.current?.click()} className={`bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 border-dashed hover:border-purple-500/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[300px] relative overflow-hidden group`}>
                  {uploadedImage ? (
                    <>
                      <img src={uploadedImage} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain bg-black/50" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-white mb-2" />
                          <p className="font-medium text-white">Click to change image</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Upload your image</h3>
                      <p className="text-gray-400 text-sm">Click to browse from your computer</p>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Motion Prompt (Optional)</label>
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Describe how you want the image to move" rows={3} />
                  </div>
                  <button onClick={handleGenerateRealVideo} className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${uploadedImage ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-purple-500/25' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}>
                    <Wand2 className="w-5 h-5" /> Generate Video (1 Credit)
                  </button>
                </div>
              </>
            )}

            {status1 === 'loading' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-6" />
                <h3 className="text-2xl font-medium mb-2">Generating Video...</h3>
                <p className="text-gray-400">Applying AI motion models to your image.</p>
                <div className="w-full max-w-md h-2 bg-white/10 rounded-full mt-8 overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 w-1/2 animate-[pulse_2s_ease-in-out_infinite] rounded-full"></div>
                </div>
              </div>
            )}

            {status1 === 'done' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-medium mb-6">Video Generated Successfully!</h3>
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-6 border border-white/10 relative group shadow-2xl">
                  <video src={generatedVideoUrl || "/demo-video.mp4"} autoPlay loop muted controls className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button onClick={() => { setStatus1('idle'); setUploadedImage(null); setGeneratedVideoUrl(null); }} className="flex-1 py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-colors">
                    Generate Another
                  </button>
                  <button onClick={() => handleDownload(generatedVideoUrl || '/demo-video.mp4', 'ai-video.mp4')} className="flex-1 py-3 bg-purple-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/25">
                    <Download className="w-5 h-5" /> Download HD Video
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'dubbing':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-2">Universal Video Dubbing</h2>
            <p className="text-gray-400 mb-8">Translate videos into 50+ languages with perfect lip-sync.</p>
            
            {status2 === 'idle' && (
              <>
                <input type="file" ref={videoInputRef} onChange={handleVideoUpload} accept="video/mp4, video/quicktime" className="hidden" />
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div onClick={() => videoInputRef.current?.click()} className={`bg-white/5 border ${uploadedVideoName ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 border-dashed'} rounded-2xl p-8 hover:border-blue-500/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[250px] group`}>
                    {uploadedVideoName ? (
                      <>
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4"><CheckCircle2 className="w-6 h-6 text-blue-400" /></div>
                        <h3 className="text-lg font-medium mb-2 text-blue-400">Video Selected</h3>
                        <p className="text-gray-300 text-sm truncate w-full px-4 font-medium">{uploadedVideoName}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Upload className="w-6 h-6 text-blue-400" /></div>
                        <h3 className="text-lg font-medium mb-2">Upload Video</h3>
                      </>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Target Language</label>
                      <select className="w-full bg-[#13131a] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
                        <option>Hindi (हिंदी)</option>
                        <option>English</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button onClick={handleGenerateRealDubbing} className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${uploadedVideoName ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-blue-500/25' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}>
                  <Globe2 className="w-5 h-5" /> Start Dubbing (1 Credit)
                </button>
              </>
            )}
            
            {status2 === 'loading' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
                <h3 className="text-2xl font-medium mb-2">Translating & Lip-syncing...</h3>
                <div className="w-full max-w-md h-2 bg-white/10 rounded-full mt-8 overflow-hidden relative"><div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4 animate-[pulse_2s_ease-in-out_infinite] rounded-full"></div></div>
              </div>
            )}

            {status2 === 'done' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-2xl font-medium mb-6">Dubbing Complete!</h3>
                <div className="flex gap-4 w-full mt-4">
                  <button onClick={() => { setStatus2('idle'); setUploadedVideoName(null); }} className="flex-1 py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-colors">Dub Another</button>
                  <button onClick={() => handleDownload('/demo-video.mp4', 'dubbed.mp4')} className="flex-1 py-3 bg-blue-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"><Download className="w-5 h-5" /> Download</button>
                </div>
              </div>
            )}
          </div>
        );
      case 'anime':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-2">3D Anime Studio</h2>
            <p className="text-gray-400 mb-8">Create anime reels and movies from text.</p>
            
            {status3 === 'idle' && (
              <>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {['Studio Ghibli', 'Cyberpunk', 'Classic'].map((style) => (
                    <div key={style} onClick={() => setSelectedStyle(style)} className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedStyle === style ? 'bg-pink-500/20 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.15)] scale-[1.02]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                      <p className={`text-sm font-medium text-center ${selectedStyle === style ? 'text-pink-400' : 'text-gray-300'}`}>{style}</p>
                    </div>
                  ))}
                </div>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white mb-4" placeholder="Describe your scene..." rows={4} />
                <button onClick={() => handleSimulate(setStatus3, 'anime')} className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  <Film className="w-5 h-5" /> Generate Anime (1 Credit)
                </button>
              </>
            )}
            
            {status3 === 'loading' && <div className="p-12 text-center"><Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" /><h3>Rendering Anime...</h3></div>}
            
            {status3 === 'done' && (
              <div className="text-center p-8">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <img src="/hero-ai.png" alt="Anime" className="w-full rounded-xl mb-4" />
                <button onClick={() => setStatus3('idle')} className="w-full py-3 bg-white/10 rounded-xl mb-2">Create New</button>
                <button onClick={() => handleDownload('/hero-ai.png', 'anime.png')} className="w-full py-3 bg-pink-600 rounded-xl flex items-center justify-center gap-2"><Download className="w-5 h-5" /> Download</button>
              </div>
            )}
          </div>
        );
      case 'gallery':
        return (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-2">My Gallery</h2>
            <p className="text-gray-400 mb-8">Your previously generated AI creations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                  <div className="aspect-video bg-black relative">
                    {item.type === 'anime' ? (
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <video src={item.url} className="w-full h-full object-cover" muted />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button onClick={() => handleDownload(item.url, `omnicreate_${item.type}`)} className="p-3 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#13131a] border border-purple-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-purple-500/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6">
              <Crown className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Out of Credits!</h2>
            <p className="text-gray-400 mb-8">You've used all your free credits. Upgrade to the Pro plan to continue creating unlimited AI magic.</p>
            
            <div className="bg-white/5 rounded-2xl p-4 mb-6 text-left border border-white/10">
              <p className="text-sm text-purple-400 font-bold uppercase tracking-wider mb-1">Yearly Pro Plan</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">$1.99</span><span className="text-gray-500 text-sm">/mo</span>
              </div>
              <p className="text-xs text-gray-400">Billed annually. Unlimited generations.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowUpgradeModal(false)} className="flex-1 py-3 bg-white/5 rounded-xl font-medium hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={() => alert("Redirecting to Stripe Payment Gateway...")} className="flex-[2] py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <CreditCard className="w-5 h-5" /> Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`hidden md:flex w-64 border-r border-white/5 bg-[#0a0a0f] p-6 flex-col fixed h-full z-20`}>
        <div className="flex items-center gap-2 mb-12 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">OmniCreate<span className="text-purple-400">.ai</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {isOwner && (
            <button onClick={() => setActiveTab('admin-panel')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-4 ${activeTab === 'admin-panel' ? 'bg-yellow-500/20 text-yellow-400 shadow-[inset_2px_0_0_#eab308] border border-yellow-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <LayoutDashboard className="w-5 h-5" /> <span className="font-bold">Admin Panel</span>
            </button>
          )}

          <button onClick={() => setActiveTab('image-to-video')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'image-to-video' ? 'bg-purple-500/20 text-purple-400 shadow-[inset_2px_0_0_#a855f7]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Video className="w-5 h-5" /> <span className="font-medium">Image to Video</span>
          </button>
          
          <button onClick={() => setActiveTab('dubbing')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dubbing' ? 'bg-blue-500/20 text-blue-400 shadow-[inset_2px_0_0_#3b82f6]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Globe2 className="w-5 h-5" /> <span className="font-medium">Video Dubbing</span>
          </button>

          <button onClick={() => setActiveTab('anime')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'anime' ? 'bg-pink-500/20 text-pink-400 shadow-[inset_2px_0_0_#ec4899]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Film className="w-5 h-5" /> <span className="font-medium">3D Anime Studio</span>
          </button>

          <div className="my-4 border-t border-white/5 pt-4"></div>

          <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'gallery' ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#ffffff]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <History className="w-5 h-5" /> <span className="font-medium">My Gallery</span>
          </button>
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-white/5">
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">
                {isOwner ? 'Owner Plan' : isVip ? 'VIP Free Plan' : 'Free Credits'}
              </span>
              <span className={`text-sm font-bold ${credits === 0 ? 'text-red-400' : 'text-purple-400'}`}>
                {hasUnlimited ? 'Unlimited' : `${credits}/5`}
              </span>
            </div>
            {!hasUnlimited && (
              <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${credits === 0 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${(credits/5)*100}%` }}></div>
              </div>
            )}
            {credits === 0 && !hasUnlimited && (
              <button onClick={() => setShowUpgradeModal(true)} className="w-full mt-3 py-1.5 text-xs font-bold bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                Upgrade Plan
              </button>
            )}
          </div>

          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 relative overflow-y-auto h-screen w-full">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <header className="flex justify-between items-start md:items-center mb-8 md:mb-12 relative z-10 flex-col md:flex-row gap-4 md:gap-0">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                Welcome back, {isOwner ? 'Boss' : 'Creator'}
                {isOwner && <Crown className="w-5 h-5 text-yellow-400" />}
              </h1>
              <p className="text-gray-400 text-xs md:text-sm">
                {isOwner ? 'You have full admin access.' : 'Ready to make some magic today?'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 self-end md:self-auto">
            {!isOwner && (
              <button onClick={() => setShowUpgradeModal(true)} className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Crown className="w-4 h-4 hidden sm:block" /> Upgrade
              </button>
            )}
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 shadow-lg ${isOwner ? 'bg-gradient-to-tr from-yellow-400 to-orange-500 border-yellow-600' : 'bg-gradient-to-tr from-purple-500 to-blue-500 border-[#0a0a0f]'}`}></div>
          </div>
        </header>

        <div className="relative z-10 pb-20 md:pb-0">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#13131a]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around p-3 z-50">
        <button onClick={() => setActiveTab('image-to-video')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === 'image-to-video' ? 'text-purple-400' : 'text-gray-500'}`}>
          <Video className="w-6 h-6" />
          <span className="text-[10px] font-medium">Video</span>
        </button>
        <button onClick={() => setActiveTab('dubbing')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === 'dubbing' ? 'text-blue-400' : 'text-gray-500'}`}>
          <Globe2 className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dubbing</span>
        </button>
        <button onClick={() => setActiveTab('anime')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === 'anime' ? 'text-pink-400' : 'text-gray-500'}`}>
          <Film className="w-6 h-6" />
          <span className="text-[10px] font-medium">Anime</span>
        </button>
        <button onClick={() => setActiveTab('gallery')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === 'gallery' ? 'text-white' : 'text-gray-500'}`}>
          <History className="w-6 h-6" />
          <span className="text-[10px] font-medium">Gallery</span>
        </button>
        {isOwner && (
          <button onClick={() => setActiveTab('admin-panel')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === 'admin-panel' ? 'text-yellow-400' : 'text-gray-500'}`}>
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[10px] font-medium">Admin</span>
          </button>
        )}
      </div>
    </div>
  );
}