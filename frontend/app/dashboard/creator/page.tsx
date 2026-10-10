"use client";

import React from 'react';
import { DEMO_CREATORS, DEMO_PROJECTS, DEMO_SERVICES } from '@/lib/mockData';
import { 
  TrendingUp, 
  Layers, 
  Star, 
  IndianRupee, 
  Sparkles, 
  CheckCircle2, 
  Wand2, 
  Clock, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function CreatorDashboardPage() {
  const creator = DEMO_CREATORS[0]; // Elena Rostova
  const activeProjects = DEMO_PROJECTS.filter((p) => p.creatorName === creator.name);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Creator Studio Hub</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome back, {creator.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your AI pipelines, review orders, optimize your creator profile, and track earnings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/ai-studio"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold"
          >
            <Wand2 className="h-4 w-4" />
            AI Creator Copilot
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
          >
            Publish New Service
          </Link>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Total Volume</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">₹{(creator.totalEarnings * 82).toLocaleString()}</div>
          <span className="text-[11px] text-emerald-500/80 mt-1 block">+18% this month</span>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Completed Projects</span>
          <div className="text-2xl font-extrabold text-white mt-1">{creator.totalProjects}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">99.4% success rate</span>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Average Rating</span>
          <div className="text-2xl font-extrabold text-amber-400 mt-1 flex items-center gap-1">
            <Star className="h-5 w-5 fill-amber-400" />
            {creator.rating}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">{creator.reviewCount} total reviews</span>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Profile Impressions</span>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1">4.2K</div>
          <span className="text-[11px] text-cyan-500/80 mt-1 block">8.6% hire conversion</span>
        </div>
      </div>

      {/* Active Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Orders in Progress */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Current Active Client Pipelines</h2>
            <span className="text-xs text-slate-400">{activeProjects.length} Active Orders</span>
          </div>

          <div className="space-y-4">
            {activeProjects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {proj.status.replace('_', ' ')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">{proj.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">Client: {proj.clientName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Milestone Escrow</span>
                    <span className="text-base font-extrabold text-emerald-400">₹{proj.budget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Draft Progress: {proj.progress}%</span>
                    <span>{proj.deadline}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Simulated 4K AI generation pipeline</span>
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white">
                    Upload AI Deliverable Stems
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Creator Copilot & Quick Optimizations */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 to-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              AI Creator Copilot Suggestions
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <span className="font-semibold text-white block">💡 Add Kling AI to your toolstack</span>
                <p className="text-slate-400 mt-1 text-[11px]">
                  Client searches for "Kling AI realistic physics" rose 42% this week.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <span className="font-semibold text-white block">⚡ Optimize Service Thumbnail</span>
                <p className="text-slate-400 mt-1 text-[11px]">
                  Use high-contrast 4K neon lighting to increase CTR by an estimated 18%.
                </p>
              </div>
            </div>

            <Link
              href="/ai-studio"
              className="block w-full text-center py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
            >
              Open Full AI Creator Copilot
            </Link>
          </div>

          {/* Earnings Simulator Widget */}
          <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Creator Earnings Simulator (Projections)
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Avg Project Price:</span>
                <span className="font-bold text-white">₹3,500</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Orders / Month:</span>
                <span className="font-bold text-white">8 orders</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Platform Fee (10%):</span>
                <span className="font-semibold text-rose-400">-₹2,800</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="font-bold text-slate-200">Est. Net Monthly:</span>
                <span className="text-base font-extrabold text-emerald-400">₹25,200</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-tight">
                *Projections are simulated estimates based on past platform activity.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
