"use client";

import React, { useState } from 'react';
import { DEMO_NOTIFICATIONS } from '@/lib/mockData';
import { Bell, CheckCircle2, Sparkles, IndianRupee, Layers } from 'lucide-react';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(DEMO_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Activity Center</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Notifications & Alerts</h1>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifs.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border transition-colors flex items-start gap-4 ${n.read ? 'border-slate-800 bg-slate-900/40 text-slate-400' : 'border-indigo-500/30 bg-slate-900/80 text-white'}`}
          >
            <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 shrink-0">
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">{n.title}</h3>
                <span className="text-[10px] text-slate-500">{n.createdAt}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
