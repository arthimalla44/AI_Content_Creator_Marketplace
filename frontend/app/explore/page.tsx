"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_CREATORS, DEMO_SERVICES } from '@/lib/mockData';
import { Search, Filter, Star, ShieldCheck, ArrowRight, Video, Sparkles, Tag, SlidersHorizontal } from 'lucide-react';
import { AIProjectCopilotModal } from '@/components/AIProjectCopilotModal';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'creators' | 'services'>('creators');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copilotOpen, setCopilotOpen] = useState(false);

  const categories = [
    'All',
    'AI Video Creators',
    'AI Image Creators',
    'AI Copywriters',
    'AI Voice Creators',
    'AI Avatar Creators',
    'AI Music Creators'
  ];

  const filteredCreators = DEMO_CREATORS.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredServices = DEMO_SERVICES.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/20">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Marketplace Discovery
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore AI Creators & Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Find vetted generative artists, compare transparent AI skill match scores, or browse packaged deliverables ready for production.
          </p>
        </div>

        <button
          onClick={() => setCopilotOpen(true)}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
        >
          <Sparkles className="h-4 w-4" />
          Find with AI Copilot
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by creator name, tool (e.g. Runway, Flux, Midjourney), or deliverable..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Switch tabs */}
          <div className="flex rounded-xl border border-slate-800 bg-slate-900/90 p-1">
            <button
              onClick={() => setActiveTab('creators')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'creators' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Creators ({filteredCreators.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'services' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Services ({filteredServices.length})
            </button>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedCategory === cat ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Grid */}
      {activeTab === 'creators' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/80 hover:bg-slate-900/90 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:ring-1 hover:ring-cyan-400/50 cursor-pointer overflow-hidden"
            >
              {/* Radiant Ambient Neon Glow on Hover */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-cyan-500/0 to-indigo-500/0 group-hover:from-indigo-500/20 group-hover:via-cyan-400/25 group-hover:to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="h-14 w-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-cyan-400/30"
                      />
                      {creator.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online now" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                          {creator.name}
                        </h3>
                        {creator.verified && (
                          <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span className="flex items-center text-amber-400 font-bold">
                          <Star className="h-3.5 w-3.5 fill-amber-400 mr-1" />
                          {creator.rating}
                        </span>
                        <span>({creator.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 group-hover:border-emerald-400/40 transition-colors">
                    {creator.completionRate}% Done
                  </span>
                </div>

                <p className="text-xs font-semibold text-indigo-300 mt-4 group-hover:text-indigo-200 transition-colors">
                  {creator.headline}
                </p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {creator.description}
                </p>

                {/* AI Specialties */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {creator.tools.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700 group-hover:border-slate-600 group-hover:bg-slate-800/90 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 group-hover:border-slate-700/80 flex items-center justify-between transition-colors">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starts at</span>
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    ₹{creator.startingPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/creator/${creator.username}`}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 text-xs text-slate-200 hover:text-white transition-all shadow-sm"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/creator/${creator.username}?hire=true`}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-all shadow-md shadow-indigo-600/30 hover:shadow-cyan-400/40 hover:scale-105 active:scale-95"
                  >
                    Hire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <Link
              key={srv.id}
              href={`/service/${srv.id}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={srv.thumbnail}
                    alt={srv.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 backdrop-blur-sm border border-slate-700">
                    {srv.deliveryDays}d Turnaround
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={srv.creatorAvatar}
                      alt={srv.creatorName}
                      className="h-5 w-5 rounded-full object-cover border border-slate-700"
                    />
                    <span className="text-xs text-slate-300 font-medium">{srv.creatorName}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                    {srv.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-1 text-xs text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400 mr-0.5" />
                    <span className="font-bold">{srv.rating}</span>
                    <span className="text-slate-500">({srv.reviewsCount})</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">Starting Price</span>
                <span className="text-sm font-bold text-white">₹{srv.basicPrice.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Copilot Modal */}
      <AIProjectCopilotModal
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
      />

    </div>
  );
}
