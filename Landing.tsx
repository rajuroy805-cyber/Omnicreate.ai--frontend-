import { motion } from 'framer-motion';
import { Video, Globe2, Film, Image as ImageIcon, Zap, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">OmniCreate<span className="text-purple-400">.ai</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              Open App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4" />
            <span>The World's Most Affordable All-in-One AI Studio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Create Everything. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              Without Breaking the Bank.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            From Image-to-Video and Universal Dubbing to 3D Anime creation. 
            The ultimate AI toolkit designed for everyone, at a price no one can beat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              Enter Dashboard <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 p-2 backdrop-blur-sm">
              <img 
                src="/hero-ai.png" 
                alt="OmniCreate AI Interface" 
                className="w-full h-auto rounded-xl shadow-2xl object-cover aspect-video"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">One Platform. <span className="text-purple-400">Infinite Possibilities.</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to bring your imagination to life, packed into a single, intuitive interface.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-purple-500/50 transition-colors overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Image to Video</h3>
              <p className="text-gray-400 leading-relaxed">
                Transform static images into dynamic, cinematic videos with a single click.
              </p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-blue-500/50 transition-colors overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Universal Video Dubbing</h3>
              <p className="text-gray-400 leading-relaxed">
                Translate any video into 50+ languages with perfect lip-sync. From 10 seconds to 3 hours.
              </p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-pink-500/50 transition-colors overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">3D Anime Studio</h3>
              <p className="text-gray-400 leading-relaxed">
                Generate stunning 3D anime content. Direct your own anime without any 3D modeling skills.
              </p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-emerald-500/50 transition-colors overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Pro Image Editing</h3>
              <p className="text-gray-400 leading-relaxed">
                A complete suite for all your image editing needs. Remove backgrounds, upscale, and outpaint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The World's Most <span className="text-green-400">Affordable</span> AI.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Free Plan */}
            <div className="p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 relative hover:border-gray-500/50 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">Free Demo</h3>
              <p className="text-gray-400 text-sm mb-6">Try before you buy</p>
              <div className="flex items-baseline gap-2 mb-8 mt-4">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['5 Free Credits', 'Standard Quality', 'Watermarked Videos', 'Community Support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-gray-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors font-medium text-gray-300"
              >
                Start Free Trial
              </button>
            </div>

            {/* Monthly Plan */}
            <div className="p-8 rounded-3xl bg-[#13131a] border border-white/10 relative hover:border-blue-500/50 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">Monthly</h3>
              <p className="text-gray-400 text-sm mb-6">Perfect for short-term projects</p>
              <div className="flex items-baseline gap-2 mb-8 mt-4">
                <span className="text-5xl font-bold">$4.99</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['100 AI Credits/mo', '10 Hours Video Dubbing', 'No Watermarks', 'Fast Processing'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors font-medium"
              >
                Subscribe Monthly
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/40 to-[#0a0a0f] border border-purple-500/50 relative transform md:-translate-y-4 shadow-2xl shadow-purple-500/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-purple-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-semibold mb-2">Yearly</h3>
              <p className="text-purple-300 text-sm mb-6">For serious creators (Save 60%)</p>
              <div className="flex items-baseline gap-2 mb-2 mt-4">
                <span className="text-5xl font-bold">$1.99</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="text-xs text-gray-500 mb-8">Billed annually at $23.88</p>
              <ul className="space-y-4 mb-8">
                {['Unlimited Everything', 'Unlimited Video Dubbing', 'Unlimited 3D Anime Movies', 'Priority 24/7 Support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-medium shadow-lg shadow-white/10"
              >
                Get Yearly Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
