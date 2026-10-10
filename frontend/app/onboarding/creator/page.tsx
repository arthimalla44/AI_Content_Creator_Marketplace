"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, ArrowRight, CheckCircle2, DollarSign, Wrench, Layers } from 'lucide-react';

export default function CreatorOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [headline, setHeadline] = useState('Cinematic AI Commercials & Runway Gen-3 Worldbuilder');
  const [bio, setBio] = useState('Pioneer AI Creator specializing in generative video, Midjourney aesthetics, and photorealistic CGI.');
  const [skills, setSkills] = useState('Runway Gen-3, Midjourney v6, ComfyUI, Sound Design');
  const [tools, setTools] = useState('Runway Gen-3, Midjourney, Kling AI, Topaz Video AI, ElevenLabs');
  const [category, setCategory] = useState('AI Video Creators');
  const [experience, setExperience] = useState('Senior (4+ yrs)');
  const [startingPrice, setStartingPrice] = useState(3500);
  const [portfolioUrl, setPortfolioUrl] = useState('https://behance.net/creator-sample');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push('/dashboard/creator');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/25 mb-4">
            <div className="h-full w-full rounded-[14px] bg-slate-950 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Welcome, Creator! Let's build your profile</h1>
          <p className="mt-2 text-sm text-slate-400">
            Tell brands about your AI toolchain, portfolio, and specialties. You can update these anytime.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {saved && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>Profile configured successfully! Redirecting to your Creator Studio...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Professional Headline
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Photorealistic AI Product Visualizer & Runway Director"
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Short Bio / Creator Summary
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Primary Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="AI Video Creators">AI Video Creators</option>
                  <option value="AI Image Creators">AI Image Creators</option>
                  <option value="AI Copywriters">AI Copywriters</option>
                  <option value="AI Voice Creators">AI Voice Creators</option>
                  <option value="AI Avatar Creators">AI Avatar Creators</option>
                  <option value="AI Music Creators">AI Music Creators</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Rising Talent (1 yr)">Rising Talent (1 yr)</option>
                  <option value="Pro (2-3 yrs)">Pro (2-3 yrs)</option>
                  <option value="Senior (4+ yrs)">Senior (4+ yrs)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                AI Tools & Models Used (comma-separated)
              </label>
              <input
                type="text"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="Runway Gen-3, Midjourney v6, Flux.1, ElevenLabs..."
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Starting Price (₹ / Project)
                </label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
                    ₹
                  </div>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Portfolio / Social Link
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://behance.net/your-handle"
                  className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard/creator')}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Skip for now
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-cyan-600/20 flex items-center gap-2"
              >
                Complete Onboarding <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
