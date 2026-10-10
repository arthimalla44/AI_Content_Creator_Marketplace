"use client";

import React, { useState } from 'react';
import { DEFAULT_PROMPTS, PromptListing } from '@/lib/sharedData';
import { Sparkles, Lock, Unlock, ArrowRight, CheckCircle2, Copy, Bot } from 'lucide-react';

export default function PromptsMarketplacePage() {
  const [prompts] = useState<PromptListing[]>(DEFAULT_PROMPTS);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUnlock = (id: string) => {
    setUnlockedIds([...unlockedIds, id]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/20">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Prompt Marketplace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Curated High-Performance AI Prompts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Battle-tested prompt formulas with lighting syntax, camera direction cues, and negative seeds verified for commercial output.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((p) => {
          const isUnlocked = unlockedIds.includes(p.id);

          return (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {p.model}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{p.category}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-300 mb-4">{p.description}</p>

                {/* Example Output Image */}
                <div className="rounded-xl overflow-hidden border border-slate-800 h-48 bg-slate-950 mb-4 relative">
                  <img src={p.exampleOutput} alt={p.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-cyan-300 font-medium">
                    Verified Sample Output
                  </span>
                </div>

                {/* Prompt Reveal Box */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 mb-4 text-xs font-mono">
                  {isUnlocked ? (
                    <div className="space-y-2">
                      <p className="text-emerald-300 text-[11px] leading-relaxed break-words">
                        /imagine prompt: cinematic 8k, titanium body sleek curves, obsidian reflections, macro telephoto lens f/1.4, rain drops on aerodynamic carbon fiber hood, neon cyan rim lights --ar 16:9 --style raw --v 6.1
                      </p>
                      <button
                        onClick={() =>
                          handleCopy(
                            p.id,
                            '/imagine prompt: cinematic 8k, titanium body sleek curves, obsidian reflections, macro telephoto lens f/1.4, rain drops on aerodynamic carbon fiber hood, neon cyan rim lights --ar 16:9 --style raw --v 6.1'
                          )
                        }
                        className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-white hover:bg-slate-700 flex items-center gap-1"
                      >
                        {copiedId === p.id ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        {copiedId === p.id ? 'Copied!' : 'Copy Full Formula'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-500 py-1">
                      <span className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                        Prompt hidden behind license protection
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action bar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price</span>
                  <span className="text-base font-bold text-white">₹{p.price}</span>
                </div>

                {isUnlocked ? (
                  <span className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <Unlock className="h-3.5 w-3.5" /> Prompt Unlocked
                  </span>
                ) : (
                  <button
                    onClick={() => handleUnlock(p.id)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                  >
                    Unlock Prompt (Simulated ₹{p.price})
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
