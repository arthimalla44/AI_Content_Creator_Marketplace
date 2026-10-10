import React from 'react';
import Link from 'next/link';
import { Sparkles, Globe, Share2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">CreatorHub AI</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier marketplace connecting brands with world-class AI content creators, filmmakers, voice artists, and visual engineers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition-colors"><Globe className="h-4 w-4" /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><Share2 className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Marketplace</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore All</Link></li>
              <li><Link href="/creators" className="hover:text-white transition-colors">AI Video Creators</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Trending Services</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition-colors">Post a Project Job</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">AI Innovation</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li><Link href="/ai-studio" className="hover:text-white transition-colors">AI Project Copilot</Link></li>
              <li><Link href="/ai-studio" className="hover:text-white transition-colors">AI Brief Generator</Link></li>
              <li><Link href="/ai-studio" className="hover:text-white transition-colors">Content Quality Checker</Link></li>
              <li><Link href="/ai-studio" className="hover:text-white transition-colors">Creator Profile Optimizer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Hackathon Demo</h3>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Built with Next.js, TypeScript, Tailwind CSS, Prisma architecture & multi-provider AI abstraction.
            </p>
            <div className="mt-4 rounded-lg border border-indigo-500/20 bg-indigo-950/20 p-2.5 text-[11px] text-indigo-300">
              ✨ 100% Functional Local Demo with Simulated Escrow & AI Copilot.
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            &copy; 2026 CreatorHub AI. Discover AI creators. Build better content. Grow faster.
          </div>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for AI Content Creators.
          </div>
        </div>
      </div>
    </footer>
  );
};
