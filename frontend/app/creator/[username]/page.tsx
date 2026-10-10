"use client";

import React, { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { DEMO_CREATORS, DEMO_PORTFOLIO, DEMO_SERVICES, DEMO_REVIEWS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';
import { 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  MessageSquare, 
  IndianRupee, 
  Share2, 
  Heart,
  Bot
} from 'lucide-react';
import Link from 'next/link';

export default function CreatorProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const username = (params?.username as string) || 'elenarostova';
  const hireParam = searchParams.get('hire');
  const hiringPrompt = searchParams.get('hiringPrompt');

  const creator = DEMO_CREATORS.find((c) => c.username.toLowerCase() === username.toLowerCase()) || DEMO_CREATORS[0];
  const creatorPortfolio = DEMO_PORTFOLIO.filter((p) => p.creatorId === creator.id);
  const creatorServices = DEMO_SERVICES.filter((s) => s.creatorId === creator.id);

  // Hiring Form State
  const [showHireModal, setShowHireModal] = useState(hireParam === 'true' || !!hiringPrompt);
  const [projectTitle, setProjectTitle] = useState('30-second AI product advertisement');
  const [projectRequirements, setProjectRequirements] = useState(
    hiringPrompt || 'I need a high-impact 30s product launch ad with Runway Gen-3 and synchronized sound design.'
  );
  const [projectBudget, setProjectBudget] = useState(5000);
  const [orderCreated, setOrderCreated] = useState(false);

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCreated(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Profile Header Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 mb-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
              />
              {creator.online && (
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-950" title="Online now" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{creator.name}</h1>
                {creator.verified && (
                  <ShieldCheck className="h-5 w-5 text-cyan-400" />
                )}
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
                  {creator.category}
                </span>
              </div>

              <p className="text-sm font-semibold text-indigo-300 mt-1">{creator.headline}</p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-amber-400 mr-1" />
                  {creator.rating}
                  <span className="text-slate-400 font-normal ml-1">({creator.reviewCount} reviews)</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  Response: {creator.responseTime}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">
                  {creator.completionRate}% Completion Rate
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href={`/messages?recipient=${creator.userId}`}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Message
            </Link>
            <button
              onClick={() => setShowHireModal(true)}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              Hire Creator
            </button>
          </div>

        </div>

        {/* AI Toolstack Chips */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-2">Verified AI Tool Mastery:</span>
          {creator.tools.map((t, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1"
            >
              <Bot className="h-3 w-3 text-cyan-400" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Details & Right Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About Creator */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-base font-bold text-white mb-3">About Creator</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {creator.description}
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
              <div>
                <span className="text-[11px] text-slate-400 uppercase">Experience</span>
                <p className="text-sm font-semibold text-white mt-0.5">{creator.experience}</p>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase">Total Completed</span>
                <p className="text-sm font-semibold text-cyan-400 mt-0.5">{creator.totalProjects} Projects</p>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase">Total Volume</span>
                <p className="text-sm font-semibold text-emerald-400 mt-0.5">₹{(creator.totalEarnings * 82).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Portfolio Showcase */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Featured AI Generations & Case Studies
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creatorPortfolio.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  <div className="relative h-48 w-full bg-slate-950">
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                    <span className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-cyan-300 backdrop-blur-sm">
                      AI Generated
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.toolsUsed.map((tool, idx) => (
                        <span key={idx} className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Reviews */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Client Reviews & Verification</h2>
              <span className="text-xs font-semibold text-amber-400 flex items-center">
                <Star className="h-3.5 w-3.5 fill-amber-400 mr-1" />
                {creator.rating} Average Rating
              </span>
            </div>

            <div className="space-y-4">
              {DEMO_REVIEWS.map((rev) => (
                <div key={rev.id} className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="h-8 w-8 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-semibold text-white block">{rev.reviewerName}</span>
                        <span className="text-[10px] text-slate-400">{rev.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400 mr-0.5" />
                      {rev.rating}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Packaged Services */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sticky top-24">
            <h3 className="text-sm font-bold text-white mb-4">Packaged Services by {creator.name}</h3>
            
            <div className="space-y-4">
              {creatorServices.map((srv) => (
                <div key={srv.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 hover:border-indigo-500/40 transition-colors">
                  <h4 className="text-xs font-bold text-white">{srv.title}</h4>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{srv.deliveryDays} Days Turnaround</span>
                    <span className="font-bold text-indigo-400">₹{srv.basicPrice.toLocaleString()}</span>
                  </div>
                  <Link
                    href={`/service/${srv.id}`}
                    className="mt-3 block w-full text-center rounded-lg bg-slate-800 hover:bg-slate-700 py-1.5 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    View Package Details
                  </Link>
                </div>
              ))}
            </div>

            {/* AI Digital Assistant Card */}
            <div className="mt-6 rounded-xl border border-cyan-500/20 bg-slate-950 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">AI Assistant for {creator.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">Automated Bot</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Ask instant questions about {creator.name}'s tools, typical turnaround, and commercial licensing terms.
              </p>
              <div className="space-y-1.5 text-[11px]">
                <button
                  onClick={() => alert(`${creator.name} uses ${creator.tools.join(', ')} with high-speed rendering.`)}
                  className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
                >
                  💬 "What is {creator.name}'s primary toolchain?"
                </button>
                <button
                  onClick={() => alert(`Starting rates begin at ₹${creator.startingPrice}. Typical turnaround is 3-5 days.`)}
                  className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
                >
                  💬 "What is the typical delivery timeframe?"
                </button>
                <button
                  onClick={() => alert(`Yes! All completed orders come with full commercial exploitation rights.`)}
                  className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
                >
                  💬 "Do deliverables include commercial rights?"
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-3">Have a bespoke project?</span>
              <button
                onClick={() => setShowHireModal(true)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
              >
                Request Custom Milestone
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Hire Creator Modal */}
      {showHireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-indigo-500/30 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Hire {creator.name}
              </h3>
              <button onClick={() => setShowHireModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {orderCreated ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Project Created & Simulated Escrow Funded!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  ₹{projectBudget.toLocaleString()} is locked in local simulated escrow. {creator.name} has been notified and the project dashboard is active.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Link
                    href="/dashboard/client"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
                  >
                    Go to My Projects
                  </Link>
                  <button
                    onClick={() => { setShowHireModal(false); setOrderCreated(false); }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleHireSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Requirements & Brief</label>
                  <textarea
                    rows={3}
                    required
                    value={projectRequirements}
                    onChange={(e) => setProjectRequirements(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Budget (INR)</label>
                    <input
                      type="number"
                      required
                      value={projectBudget}
                      onChange={(e) => setProjectBudget(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Delivery Target</label>
                    <input
                      type="text"
                      defaultValue="3-5 Business Days"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3 text-[11px] text-indigo-300">
                  🛡️ <strong>Simulated Escrow Protection:</strong> Funds are safely secured and only released upon your approval of the final AI renders.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowHireModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-xs font-bold text-white hover:opacity-95 shadow-md shadow-indigo-600/30"
                  >
                    Confirm & Start Project
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
