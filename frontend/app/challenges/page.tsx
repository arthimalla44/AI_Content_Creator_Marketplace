"use client";

import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Users, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Send,
  Zap,
  Target
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  category: string;
  theme: string;
  rewardText: string;
  deadline: string;
  rules: string;
  participantsCount: number;
  featuredBadge: string;
}

const DEMO_CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Neon Cyberpunk Kinetic Commercial',
    category: 'AI Video',
    theme: 'Design a 15-second cinematic product teaser for a futuristic watch or vehicle using Runway Gen-3 or Luma.',
    rewardText: '₹25,000 Demo Prize + Elite Creator Badge',
    deadline: '3 Days Remaining',
    rules: 'Must be 1080p+ 60fps, original generation prompt required, include synchronized SFX.',
    participantsCount: 38,
    featuredBadge: 'Gold Video Laurels'
  },
  {
    id: 'ch-2',
    title: 'Photorealistic Luxury Fashion Catalogue',
    category: 'AI Imagery',
    theme: 'Create a 3-image editorial spread with identical model consistency across varying lighting environments using Flux.1 or Midjourney v6.',
    rewardText: '₹15,000 Demo Prize + Featured Showcase',
    deadline: '5 Days Remaining',
    rules: 'High resolution 4K, zero anatomical hallucinations, prompt seed transparency.',
    participantsCount: 52,
    featuredBadge: 'Pro Fashion Stylist'
  },
  {
    id: 'ch-3',
    title: 'Viral Direct-Response TikTok Ad Script',
    category: 'AI Copywriting',
    theme: 'Write a 30s TikTok direct-response UGC script with 3 alternate 3-second retention hooks that achieve 80%+ hook retention.',
    rewardText: '₹10,000 Demo Prize + Agency Placement',
    deadline: '24 Hours Remaining',
    rules: 'Include visual stage directions and voice emphasis cues.',
    participantsCount: 29,
    featuredBadge: 'Viral Hook Specialist'
  }
];

export default function ChallengesPage() {
  const [challenges] = useState<Challenge[]>(DEMO_CHALLENGES);
  const [activeModal, setActiveModal] = useState<Challenge | null>(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  const handleSubmitEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeModal) {
      setSubmittedIds([...submittedIds, activeModal.id]);
      setActiveModal(null);
      setSubmissionLink('');
      setSubmissionNotes('');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 p-6 sm:p-10 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/20">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              Creator Challenge Hub & Bounties
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Community Creative Hackathons & Bounties
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Compete in themed AI challenges, submit your best generative outputs, earn platform verification badges, and win simulated hackathon bounties.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-center">
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Total Rewards Pool</span>
              <span className="text-lg font-extrabold text-amber-400">₹50,000</span>
              <span className="text-[10px] text-slate-500 block">(Demo Bounties)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((ch) => {
          const isSubmitted = submittedIds.includes(ch.id);

          return (
            <div
              key={ch.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700">
                    {ch.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="h-3 w-3 text-amber-400" /> {ch.deadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{ch.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{ch.theme}</p>

                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2 text-xs mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Prize / Reward:</span>
                    <span className="font-bold text-amber-300">{ch.rewardText}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Submissions:</span>
                    <span className="text-slate-200">{ch.participantsCount + (isSubmitted ? 1 : 0)} creators</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  <strong className="text-slate-300">Rules:</strong> {ch.rules}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                {isSubmitted ? (
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Entry Submitted
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveModal(ch)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:opacity-95 text-xs font-bold text-white shadow-md flex items-center justify-center gap-2"
                  >
                    Submit Entry <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
            <h3 className="text-lg font-bold text-white mb-1">Submit Challenge Entry</h3>
            <p className="text-xs text-slate-400 mb-4">{activeModal.title}</p>

            <form onSubmit={handleSubmitEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Deliverable Link (Figma, Loom, Google Drive, Runway URL)
                </label>
                <input
                  type="url"
                  required
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Prompt & Pipeline Notes
                </label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Mention models used (e.g. Runway Gen-3 + Midjourney v6) and key prompt formulas..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white"
                >
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
