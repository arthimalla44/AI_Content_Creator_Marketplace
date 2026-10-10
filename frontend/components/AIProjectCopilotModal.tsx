"use client";

import React, { useState } from 'react';
import { AIService, AIProjectCopilotResult } from '@/lib/aiService';
import { Sparkles, ArrowRight, CheckCircle2, Zap, Clock, IndianRupee, Star, Bot, Send } from 'lucide-react';
import Link from 'next/link';

export const AIProjectCopilotModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  defaultPrompt?: string;
}> = ({ isOpen, onClose, defaultPrompt = '' }) => {
  const [prompt, setPrompt] = useState(
    defaultPrompt || 'I need a 30-second AI product advertisement for a new smartphone launch with a budget of ₹5,000.'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIProjectCopilotResult | null>(null);

  if (!isOpen) return null;

  const handleRunCopilot = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await AIService.runProjectCopilot({ prompt });
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-indigo-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl shadow-indigo-500/20">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Bot className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">AI Project Copilot</h2>
                <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  Autonomous Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Describe your vision in plain English. The Copilot decomposes the creative scope, timeline, milestones, and pairs you with the ideal creators.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Input Bar */}
        <div className="mt-6 space-y-3">
          <label className="text-xs font-medium text-slate-300">
            What do you want to create? (Include budget, length or creative style if known)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. 30s luxury perfume video ad with neon reflections..."
            />
            <button
              onClick={handleRunCopilot}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 disabled:opacity-50 sm:self-stretch min-w-[160px]"
            >
              {loading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-cyan-200" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-cyan-200" />
                  Analyze Brief
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Visual */}
        {loading && (
          <div className="mt-8 flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-950/10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-cyan-400 mb-3" />
            <p className="text-sm font-medium text-indigo-300">Deconstructing creative requirements & searching neural creator index...</p>
            <p className="text-xs text-slate-500 mt-1">Cross-referencing Runway Gen-3 workflows, delivery velocity, and match scores</p>
          </div>
        )}

        {/* Result Layout */}
        {result && !loading && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                <span className="text-[11px] font-medium text-slate-400">Estimated Budget</span>
                <div className="text-lg font-bold text-white flex items-center gap-1 mt-0.5">
                  ₹{result.estimatedBudget.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                <span className="text-[11px] font-medium text-slate-400">Target Timeline</span>
                <div className="text-lg font-bold text-cyan-400 flex items-center gap-1 mt-0.5">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  {result.estimatedTimeline}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                <span className="text-[11px] font-medium text-slate-400">Format Recommended</span>
                <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
                  {result.recommendedFormat}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                <span className="text-[11px] font-medium text-slate-400">AI Toolchain</span>
                <div className="text-xs font-semibold text-indigo-300 mt-1 line-clamp-1">
                  {result.recommendedTools.slice(0, 2).join(', ')}
                </div>
              </div>
            </div>

            {/* Creative Concept & Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Creative Direction</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{result.contentConcept}</p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {result.recommendedTools.map((tool, idx) => (
                    <span key={idx} className="rounded bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-300 border border-indigo-500/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Suggested Milestones</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {result.suggestedMilestones.map((ms, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Creator Match Scoring Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  Top Creator Matches with AI Compatibility Scores
                </h3>
                <span className="text-xs text-slate-400">Ranked by model synergy</span>
              </div>

              <div className="space-y-3">
                {result.creatorMatches.map((creator) => (
                  <div
                    key={creator.creatorId}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatar}
                        alt={creator.creatorName}
                        className="h-12 w-12 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">{creator.creatorName}</span>
                          <span className="flex items-center text-xs text-amber-400">
                            <Star className="h-3.5 w-3.5 fill-amber-400 mr-0.5" />
                            {creator.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{creator.matchReason}</p>
                        
                        {/* Breakdown Pills */}
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                          <span>Skills: <strong className="text-slate-200">{creator.breakdown.skillMatch}%</strong></span>
                          <span>•</span>
                          <span>Tools: <strong className="text-slate-200">{creator.breakdown.toolMatch}%</strong></span>
                          <span>•</span>
                          <span>Budget: <strong className="text-slate-200">{creator.breakdown.budgetMatch}%</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {creator.matchScore}% Match
                        </div>
                      </div>

                      <Link
                        href={`/creator/${creator.username}?hiringPrompt=${encodeURIComponent(prompt)}`}
                        onClick={onClose}
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
                      >
                        Hire Creator
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-500">
                You can post this as a public client job or directly hire a matched creator.
              </span>
              <Link
                href={`/jobs?create=true&title=${encodeURIComponent('30-second AI product advertisement')}&budget=5000`}
                onClick={onClose}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline"
              >
                Post as Client Job Instead →
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
