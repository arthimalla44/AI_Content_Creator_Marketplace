"use client";

import React, { useState } from 'react';
import { DEMO_CREATORS, DEMO_USERS, DEMO_PROJECTS } from '@/lib/mockData';
import { ShieldCheck, CheckCircle2, AlertTriangle, Users, BarChart3, Lock, Ban } from 'lucide-react';

export default function AdminDashboardPage() {
  const [creators, setCreators] = useState(DEMO_CREATORS);
  const [activeTab, setActiveTab] = useState<'creators' | 'reports'>('creators');

  const toggleVerify = (id: string) => {
    setCreators(
      creators.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
  };

  const reports = [
    {
      id: 'rep-1',
      reporter: 'Aarav Mehta',
      target: 'Suspicious Bot Studio',
      reason: 'Spam service posting with duplicate low-res content',
      status: 'PENDING'
    },
    {
      id: 'rep-2',
      reporter: 'Elena Rostova',
      target: 'Unverified Client account',
      reason: 'Off-platform payment solicitation request',
      status: 'RESOLVED'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Platform Governance</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">CreatorHub AI Admin Console</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review creator identity badges, resolve moderation flags, and monitor platform transaction escrow.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Total Registered</span>
          <div className="text-2xl font-extrabold text-white mt-1">10,482 Users</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Verified Creators</span>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1">{creators.filter(c => c.verified).length} Active</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Escrow Volume</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">₹4,820,000</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs text-slate-400 font-medium">Open Reports</span>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">1 Pending</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('creators')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'creators' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          Creator Verification Queue
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          Moderation & Reports
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'creators' ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Creator</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Completion</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Moderator Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {creators.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60">
                  <td className="py-3 flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <span className="font-semibold text-white block">{c.name}</span>
                      <span className="text-[10px] text-slate-400">@{c.username}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-300">{c.category}</td>
                  <td className="py-3 text-emerald-400 font-semibold">{c.completionRate}%</td>
                  <td className="py-3">
                    {c.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        <ShieldCheck className="h-3 w-3" /> Verified Badge
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Pending Review
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => toggleVerify(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${c.verified ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                    >
                      {c.verified ? 'Revoke Badge' : 'Approve & Verify'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((rep) => (
            <div key={rep.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${rep.status === 'PENDING' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  {rep.status}
                </span>
                <h4 className="text-sm font-bold text-white mt-2">Target: {rep.target}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Reported by: {rep.reporter} • Reason: {rep.reason}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200">
                  Dismiss
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white">
                  Suspend Target
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
