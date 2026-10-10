"use client";

import React, { useState } from 'react';
import { DEMO_JOBS } from '@/lib/mockData';
import { useAuth } from '@/hooks/useAuth';
import { Briefcase, IndianRupee, Clock, Sparkles, Plus, CheckCircle2, Send, Bot } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage() {
  const { role, user } = useAuth();
  const [jobs, setJobs] = useState(DEMO_JOBS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [applyModalJob, setApplyModalJob] = useState<any | null>(null);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBudget, setNewBudget] = useState(5000);
  const [newCategory, setNewCategory] = useState('AI Video Creators');

  // Proposal State
  const [proposalText, setProposalText] = useState('');
  const [proposalBid, setProposalBid] = useState(4800);
  const [proposalSuccess, setProposalSuccess] = useState(false);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `job-${Date.now()}`,
      clientId: user?.id || 'client-me',
      clientName: user?.name || 'Aarav Mehta',
      clientAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      title: newTitle,
      description: newDesc,
      budget: newBudget,
      category: newCategory,
      skills: ['AI Generation', 'Prompt Engineering'],
      preferredTools: ['Runway Gen-3', 'Midjourney'],
      deadline: '4 days',
      status: 'OPEN' as const,
      applicationsCount: 0,
      createdAt: 'Just now'
    };
    setJobs([created, ...jobs]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleGenerateProposal = () => {
    setProposalText(
      `Hi ${applyModalJob?.clientName},\n\nI reviewed your brief for "${applyModalJob?.title}". I have extensive experience in this exact pipeline with 99%+ completion rate. I will deliver 4K renders within ${applyModalJob?.deadline} including 2 revision rounds and royalty-free commercial stems.`
    );
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSuccess(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Client Board</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Available Client Projects & RFPs</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse open creator contracts or post your requirements for AI talent proposals.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-indigo-600/20"
        >
          <Plus className="h-4 w-4" />
          Post New Project Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-indigo-500/40 transition-all hover:shadow-xl"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <img
                  src={job.clientAvatar}
                  alt={job.clientName}
                  className="h-8 w-8 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <span className="text-xs font-semibold text-slate-200">{job.clientName}</span>
                  <span className="text-[11px] text-slate-500 block">Posted {job.createdAt}</span>
                </div>
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300 border border-indigo-500/20 ml-2">
                  {job.category}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white hover:text-indigo-300 transition-colors">
                {job.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {job.description}
              </p>

              {/* Preferred Tools Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.preferredTools.map((t, idx) => (
                  <span key={idx} className="rounded-md bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
              <div className="text-left md:text-right">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Budget</span>
                <span className="text-xl font-extrabold text-white">₹{job.budget.toLocaleString()}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Timeline: {job.deadline}</span>
              </div>

              <button
                onClick={() => { setApplyModalJob(job); setProposalSuccess(false); }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
              >
                Apply to Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-indigo-500/30 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-cyan-400" />
                Post a Project Job
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateJob} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 30-second AI product commercial for perfume launch"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Description & Deliverables</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your creative vision, camera angles, sound requirements, and deliverables..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option>AI Video Creators</option>
                    <option>AI Image Creators</option>
                    <option>AI Copywriters</option>
                    <option>AI Avatar Creators</option>
                    <option>AI Music Creators</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Budget (INR)</label>
                  <input
                    type="number"
                    required
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apply / Proposal Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-indigo-500/30 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="h-4 w-4 text-cyan-400" />
                Submit Proposal
              </h3>
              <button onClick={() => setApplyModalJob(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {proposalSuccess ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Proposal Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">
                  {applyModalJob.clientName} has been notified and will review your proposal in their dashboard.
                </p>
                <button
                  onClick={() => setApplyModalJob(null)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="mt-4 space-y-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Applying for:</span>
                  <span className="text-xs font-bold text-white">{applyModalJob.title}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300">Your Proposal</label>
                    <button
                      type="button"
                      onClick={handleGenerateProposal}
                      className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <Bot className="h-3.5 w-3.5" />
                      Generate AI Proposal
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Explain your creative approach, delivery timeline, and relevant AI portfolio..."
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Your Bid (INR)</label>
                    <input
                      type="number"
                      required
                      value={proposalBid}
                      onChange={(e) => setProposalBid(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Estimated Days</label>
                    <input
                      type="number"
                      defaultValue={3}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyModalJob(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
