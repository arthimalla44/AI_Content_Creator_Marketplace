"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Bot, 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Mic, 
  Music, 
  UserCheck, 
  Zap,
  TrendingUp,
  Layers,
  Play
} from 'lucide-react';
import { DEMO_CREATORS, DEMO_SERVICES, DEMO_JOBS } from '@/lib/mockData';
import { HeroBackgroundEffects } from '@/components/HeroBackgroundEffects';

export default function HomePage() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = [
    { name: 'AI Video Creators', icon: Video, count: '340+ creators', desc: 'Runway Gen-3, Kling, Sora & Luma workflows' },
    { name: 'AI Image Creators', icon: ImageIcon, count: '520+ creators', desc: 'Flux.1 Pro, Midjourney v6 & LoRA models' },
    { name: 'AI Copywriters', icon: FileText, count: '290+ creators', desc: 'Viral hooks, TikTok scripts & ad copy' },
    { name: 'AI Voice Creators', icon: Mic, count: '180+ creators', desc: 'ElevenLabs cloning & multilingual voiceovers' },
    { name: 'AI Music Creators', icon: Music, count: '150+ creators', desc: 'Suno v3.5 & Udio adaptive soundtracks' },
    { name: 'AI Avatar Creators', icon: UserCheck, count: '210+ creators', desc: 'HeyGen, Synthesia digital spokespersons' },
  ];

  const handleSearchSubmit = (queryToUse?: string) => {
    const finalQuery = (queryToUse || searchInput || '').trim();
    const targetQuery = finalQuery || '30s product ad with Runway Gen-3 & sound design';
    router.push(`/ai-matching?q=${encodeURIComponent(targetQuery)}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Animated Cyber Constellation Particle Mesh */}
      <HeroBackgroundEffects />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Subtle AI badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>The Next-Generation AI Content Creator Marketplace</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-none">
          Where AI Creators Meet Their{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Next Big Project.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Discover talented AI-powered creators, hire them for your next campaign, and use intelligent AI copilot tools to turn raw concepts into high-converting content faster.
        </p>

        {/* Hero Interactive Search Bar (Exact Original Screenshot 1 Design with Animated Luminous Aura) */}
        <div className="mt-12 max-w-2xl mx-auto relative group">
          
          {/* 1. Behind-the-card Rotating Multi-Color Ambient Glow Halo */}
          <div className="absolute -inset-1.5 rounded-full opacity-70 blur-xl transition duration-700 group-hover:opacity-100 group-hover:duration-300 pointer-events-none overflow-hidden">
            <div className="absolute -inset-10 bg-[conic-gradient(from_0deg_at_50%_50%,#f97316_0deg,#ec4899_70deg,#6366f1_140deg,#38bdf8_230deg,#f97316_360deg)] animate-spin-slow opacity-80" />
          </div>

          {/* 2. Secondary Corner Flare Ambient Accents */}
          <div className="absolute -top-3 -left-4 w-32 h-20 bg-orange-500/25 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
          <div className="absolute -bottom-3 -right-4 w-36 h-24 bg-cyan-400/25 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />

          {/* 3. Main Search Bar Container */}
          <div 
            className={`relative rounded-full bg-slate-950/90 border transition-all duration-300 p-1.5 sm:p-2 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-2 ${
              searchFocused 
                ? 'border-cyan-400/80 shadow-[0_0_35px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400/40' 
                : 'border-slate-800/90 hover:border-slate-700 shadow-black/80'
            }`}
          >
            {/* Moving Border Beam (Light sweep running along rounded-full perimeter) */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_75deg,rgba(249,115,22,0.5)_90deg,rgba(56,189,248,0.9)_180deg,transparent_200deg)] animate-spin-slow opacity-60" />
              <div className="absolute inset-[1px] rounded-full bg-slate-950/95" />
            </div>

            {/* Inner Content Structure matching original design exactly */}
            <div className="relative z-10 flex items-center flex-1 min-w-0 pl-4">
              <Search className="h-5 w-5 text-indigo-400 shrink-0 mr-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. 30s product ad with Runway Gen-3 & sound design..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit(searchInput);
                }}
              />
            </div>

            {/* Find My Perfect Creator Button */}
            <button
              type="button"
              onClick={() => handleSearchSubmit(searchInput)}
              className="relative z-10 shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bot className="h-4 w-4" />
              <span>Find My Perfect Creator</span>
            </button>
          </div>

          {/* Quick presets pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>Popular:</span>
            <button 
              onClick={() => handleSearchSubmit('30-second AI product advertisement for new smartphone launch with budget ₹5000')} 
              className="text-slate-300 hover:text-cyan-300 underline underline-offset-4 transition-colors cursor-pointer"
            >
              Smartphone Launch Video
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => handleSearchSubmit('E-commerce luxury watch photoshoot with Flux.1')} 
              className="text-slate-300 hover:text-cyan-300 underline underline-offset-4 transition-colors cursor-pointer"
            >
              E-commerce Product Shoot
            </button>
          </div>
        </div>

        {/* Hero Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/explore"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-sm font-semibold transition-colors"
          >
            Explore Creators
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </Link>
          <Link
            href="/dashboard/creator"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-sm font-semibold transition-colors"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Become a Creator
          </Link>
        </div>

        {/* Platform Trust & Statistics */}
        <div className="mt-16 pt-12 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div>
            <div className="text-3xl font-extrabold text-white">10K+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Vetted AI Creators</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-cyan-400">25K+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Completed Projects</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">99.2%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-cyan-400">₹0</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Escrow Fee for Clients</div>
          </div>
        </div>

      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white">Explore by Specialized AI Workflows</h2>
          <p className="text-sm text-slate-400 mt-2">
            Hire creators with production-proven expertise across the leading generative models.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{cat.count}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.desc}</p>
                <Link 
                  href="/creators"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Browse Creators
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
