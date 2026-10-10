"use client";

import React, { useState } from 'react';
import { DEMO_CREATORS } from '@/lib/mockData';
import { Send, Paperclip, Bot, Sparkles, Check, CheckCheck } from 'lucide-react';

export default function MessagesPage() {
  const [activeCreator, setActiveCreator] = useState(DEMO_CREATORS[0]);
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'Elena Rostova',
      content: 'Hi Aarav! I reviewed the smartphone commercial brief. Runway Gen-3 camera sweeps look incredible with the titanium model.',
      time: '10:30 AM',
      isMe: false,
    },
    {
      id: 'm2',
      sender: 'Me',
      content: 'That sounds amazing Elena! Can we make sure the neon reflection matches cyan and electric purple palette?',
      time: '10:32 AM',
      isMe: true,
    },
    {
      id: 'm3',
      sender: 'Elena Rostova',
      content: 'Absolutely! Generating a 4K preview sample cut right now. Uploading it directly to our project workspace.',
      time: '10:35 AM',
      isMe: false,
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'Me',
      content: inputText,
      time: 'Just now',
      isMe: true,
    };
    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulated instant creator response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          sender: activeCreator.name,
          content: 'Got it! Incorporating those notes into the latest generative batch.',
          time: 'Just now',
          isMe: false,
        }
      ]);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[700px]">
        
        {/* Left: Conversations List */}
        <div className="border-r border-slate-800 p-4 space-y-3">
          <h2 className="text-sm font-bold text-white px-2 mb-2">Direct Messages</h2>
          
          <div className="space-y-1">
            {DEMO_CREATORS.slice(0, 3).map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCreator(c)}
                className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${activeCreator.id === c.id ? 'bg-indigo-600/20 border border-indigo-500/30' : 'hover:bg-slate-800/60'}`}
              >
                <div className="relative">
                  <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover" />
                  {c.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />}
                </div>
                <div className="overflow-hidden flex-1">
                  <span className="text-xs font-semibold text-white block truncate">{c.name}</span>
                  <span className="text-[11px] text-slate-400 block truncate">{c.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Window (2 cols) */}
        <div className="md:col-span-2 flex flex-col justify-between bg-slate-950/60">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeCreator.avatar} alt={activeCreator.name} className="h-9 w-9 rounded-full object-cover" />
              <div>
                <h3 className="text-xs font-bold text-white">{activeCreator.name}</h3>
                <span className="text-[10px] text-emerald-400">Online • Active in Workspace</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Escrow Project: <strong className="text-cyan-400">Smartphone 30s Launch</strong>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${m.isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'}`}
                >
                  {m.content}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-900/80 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Message ${activeCreator.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
