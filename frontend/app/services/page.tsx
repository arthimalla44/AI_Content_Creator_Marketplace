"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_SERVICES } from '@/lib/mockData';
import { Star, Search } from 'lucide-react';

export default function ServicesMarketplacePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'AI Video Creators', 'AI Image Creators', 'AI Copywriters', 'AI Avatar Creators'];

  const filtered = DEMO_SERVICES.filter((s) => {
    const matchCat = category === 'All' || s.category === category;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Packaged Deliverables</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">AI Content Services</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Turnkey generative video, product shoot packs, and viral scripts with fixed transparent pricing.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="space-y-3 mb-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search AI services (e.g. 4K Video, Product Photoshoot, Reels)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${category === c ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Service Cards Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((srv) => (
          <div
            key={srv.id}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-cyan-400/80 hover:bg-slate-900 transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:-translate-y-1"
          >
            <div>
              {/* Original Thumbnail Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={srv.thumbnail}
                  alt={srv.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Delivery Badge */}
                <div className="absolute top-2.5 right-2.5 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 backdrop-blur-sm border border-slate-700 z-10">
                  {srv.deliveryDays}d Delivery
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={srv.creatorAvatar}
                    alt={srv.creatorName}
                    className="h-5 w-5 rounded-full object-cover border border-slate-700"
                  />
                  <span className="text-xs text-slate-300 font-medium">{srv.creatorName}</span>
                </div>

                <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  {srv.title}
                </h3>

                <div className="mt-3 flex items-center gap-1 text-xs text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 mr-0.5" />
                  <span className="font-bold">{srv.rating}</span>
                  <span className="text-slate-500">({srv.reviewsCount})</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starting at</span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  ₹{srv.basicPrice.toLocaleString()}
                </span>
              </div>

              <Link
                href={`/service/${srv.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-all shadow-md shadow-indigo-600/30 hover:shadow-cyan-400/40 hover:scale-105 active:scale-95"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
