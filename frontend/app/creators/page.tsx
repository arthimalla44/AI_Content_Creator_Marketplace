"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_CREATORS } from '@/lib/mockData';
import { Search, Star, ShieldCheck, ArrowRight, Filter, Sparkles, MapPin, CheckCircle, ArrowUpDown, DollarSign, SlidersHorizontal, Bookmark } from 'lucide-react';

export default function CreatorsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price_low' | 'price_high' | 'projects'>('recommended');
  const [savedCreators, setSavedCreators] = useState<string[]>([]);

  const tools = ['All', 'Runway Gen-3', 'Midjourney', 'Flux.1', 'ElevenLabs', 'Claude 3.5 Sonnet', 'HeyGen', 'Suno'];
  const categories = ['All', 'AI Video Creators', 'AI Image Creators', 'AI Copywriters', 'AI Voice Creators', 'AI Avatar Creators', 'AI Music Creators'];
  const experiences = ['All', 'Pro', 'Senior', 'Expert', 'Specialist'];

  const toggleSave = (id: string) => {
    setSavedCreators((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  let filtered = DEMO_CREATORS.filter((c) => {
    const matchesTool = selectedTool === 'All' || c.tools.some((t) => t.toLowerCase().includes(selectedTool.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesExperience = selectedExperience === 'All' || c.experience.toLowerCase().includes(selectedExperience.toLowerCase());
    const matchesAvailability = !availabilityOnly || c.online;
    const matchesPrice = c.startingPrice <= maxPrice;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTool && matchesCategory && matchesExperience && matchesAvailability && matchesPrice && matchesSearch;
  });

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price_low') return a.startingPrice - b.startingPrice;
    if (sortBy === 'price_high') return b.startingPrice - a.startingPrice;
    if (sortBy === 'projects') return b.totalProjects - a.totalProjects;
    return b.completionRate - a.completionRate; // Recommended
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Creator Directory</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Verified AI Content Creators</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search, filter by toolchain, compare rating metrics, and hire top generative talents.
          </p>
        </div>
      </div>

      {/* Advanced Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by creator name, tool (e.g. Runway, Flux, Midjourney), or niche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/80 text-xs text-slate-300">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="recommended" className="bg-slate-900">Recommended</option>
                <option value="rating" className="bg-slate-900">Highest Rating</option>
                <option value="price_low" className="bg-slate-900">Price: Low to High</option>
                <option value="price_high" className="bg-slate-900">Price: High to Low</option>
                <option value="projects" className="bg-slate-900">Most Projects</option>
              </select>
            </div>
          </div>
        </div>

        {/* Multi-Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Experience Level
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {experiences.map((exp) => (
                <option key={exp} value={exp} className="bg-slate-900">{exp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Max Starting Budget (₹{maxPrice.toLocaleString()})
            </label>
            <input
              type="range"
              min={1000}
              max={10000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-slate-800 bg-slate-950/60 w-full">
              <input
                type="checkbox"
                checked={availabilityOnly}
                onChange={(e) => setAvailabilityOnly(e.target.checked)}
                className="rounded border-slate-700 text-indigo-600 focus:ring-0"
              />
              <span className="text-xs text-slate-300 font-medium">Online & Available Now</span>
            </label>
          </div>
        </div>

        {/* AI Tools Tag Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
          <span className="text-xs text-slate-400 mr-2 shrink-0">Filter Tool:</span>
          {tools.map((tool) => (
            <button
              key={tool}
              onClick={() => setSelectedTool(tool)}
              className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                selectedTool === tool
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                  : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-400">
          Showing <strong className="text-white">{filtered.length}</strong> AI creators
        </span>
      </div>

      {/* Creators Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((creator) => (
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
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">{creator.name}</h3>
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

                <button
                  onClick={() => toggleSave(creator.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    savedCreators.includes(creator.id)
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                      : 'border-slate-800 text-slate-500 hover:text-white hover:bg-slate-800'
                  }`}
                  title={savedCreators.includes(creator.id) ? 'Saved' : 'Save Creator'}
                >
                  <Bookmark className={`h-4 w-4 ${savedCreators.includes(creator.id) ? 'fill-indigo-400' : ''}`} />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-medium">
                  {creator.category}
                </span>
                <span>•</span>
                <span>{creator.experience}</span>
                <span>•</span>
                <span>{creator.responseTime} response</span>
              </div>

              <p className="text-xs font-semibold text-slate-200 mt-3">{creator.headline}</p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {creator.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1">
                {creator.tools.map((t, idx) => (
                  <span key={idx} className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 group-hover:border-slate-700/80 flex items-center justify-between transition-colors">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starts at</span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">₹{creator.startingPrice.toLocaleString()}</span>
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
    </div>
  );
}
