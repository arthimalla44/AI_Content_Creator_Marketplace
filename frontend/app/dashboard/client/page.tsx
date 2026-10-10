"use client";

import React from 'react';
import { DEMO_PROJECTS, DEMO_SERVICES } from '@/lib/mockData';
import { Layers, Clock, CheckCircle2, TrendingUp, IndianRupee, MessageSquare, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboardPage() {
  const activeProjects = DEMO_PROJECTS.filter((p) => p.status !== 'COMPLETED');
  const completedProjects = DEMO_PROJECTS.filter((p) => p.status === 'COMPLETED');

  const totalSpent = DEMO_PROJECTS.reduce((acc, p) => acc + p.budget, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Client Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">My Projects & Content Orders</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track active milestones, review AI deliverables, and communicate with your hired creators.
          </p>
        </div>

        <Link
          href="/jobs?create=true"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/20"
        >
          Post New Project Job
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Active Projects</span>
          <div className="text-2xl font-extrabold text-white mt-1">{activeProjects.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Completed Projects</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">{completedProjects.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Total Volume</span>
          <div className="text-2xl font-extrabold text-white mt-1">₹{totalSpent.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Escrow Protected</span>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1">100%</div>
        </div>
      </div>

      {/* Projects Table / Cards */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-base font-bold text-white mb-6">Active Deliverables & Milestones</h2>

        <div className="space-y-4">
          {DEMO_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${proj.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'}`}>
                    {proj.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">{proj.createdAt}</span>
                </div>

                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{proj.description}</p>

                {/* Progress bar */}
                <div className="pt-2 max-w-md">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Progress: {proj.progress}%</span>
                    <span>{proj.deadline}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Creator details and actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="flex items-center gap-2">
                  <img src={proj.creatorAvatar} alt={proj.creatorName} className="h-8 w-8 rounded-full object-cover border border-slate-700" />
                  <div className="text-left md:text-right">
                    <span className="text-xs font-semibold text-white block">{proj.creatorName}</span>
                    <span className="text-[11px] text-indigo-400 font-bold">₹{proj.budget.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/messages?recipient=${proj.creatorId}`}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    title="Chat with Creator"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Link>
                  {proj.status === 'COMPLETED' ? (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Signed Off
                    </span>
                  ) : (
                    <button className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white">
                      Review Draft
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
