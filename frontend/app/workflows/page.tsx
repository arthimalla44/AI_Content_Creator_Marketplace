"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DEFAULT_WORKFLOWS, AIWorkflowListing } from '@/lib/sharedData';
import { Wand2, Sparkles, CheckCircle2, Clock, Bot, Download, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export default function WorkflowsPage() {
  const [workflows] = useState<AIWorkflowListing[]>(DEFAULT_WORKFLOWS);
  const [selectedWf, setSelectedWf] = useState<AIWorkflowListing | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [checkoutModal, setCheckoutModal] = useState<AIWorkflowListing | null>(null);

  const handleSimulatePurchase = (wf: AIWorkflowListing) => {
    setPurchasedIds([...purchasedIds, wf.id]);
    setCheckoutModal(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold mb-2 border border-cyan-500/20">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            AI Pipeline Marketplace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Workflows & Production Chains
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Browse and license verified generative AI workflows built by experienced prompt directors. Reusable node setups, ComfyUI recipes, and video pipelines.
          </p>
        </div>
      </div>

      {/* Grid of Workflows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((wf) => {
          const isPurchased = purchasedIds.includes(wf.id);

          return (
            <div
              key={wf.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {wf.category}
                  </span>
                  <span className="text-xs text-amber-400 font-bold">★ {wf.rating}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">{wf.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{wf.description}</p>

                {/* Creator Attribution */}
                <div className="flex items-center gap-2.5 py-2.5 border-y border-slate-800/80 mb-4">
                  <img src={wf.creatorAvatar} alt={wf.creatorName} className="h-7 w-7 rounded-full object-cover border border-slate-700" />
                  <div className="text-xs">
                    <span className="text-slate-400 text-[11px] block">Created by</span>
                    <span className="font-semibold text-white">{wf.creatorName}</span>
                  </div>
                </div>

                {/* Inputs & Outputs */}
                <div className="space-y-2 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Required Inputs:</span>
                    <span className="text-slate-200">{wf.inputs.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Pipeline Outputs:</span>
                    <span className="text-cyan-300">{wf.outputs.join(', ')}</span>
                  </div>
                </div>

                {/* Tool Badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {wf.tools.map((t, idx) => (
                    <span key={idx} className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">License Price</span>
                  <span className="text-base font-bold text-white">₹{wf.price.toLocaleString()}</span>
                </div>

                {isPurchased ? (
                  <span className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Licensed
                  </span>
                ) : (
                  <button
                    onClick={() => setCheckoutModal(wf)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-95 text-xs font-bold text-white shadow-md shadow-cyan-600/20 flex items-center gap-1.5"
                  >
                    License Workflow <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
            <h3 className="text-lg font-bold text-white mb-1">Simulated Workflow Checkout</h3>
            <p className="text-xs text-slate-400 mb-4">
              Secure workflow license for <strong>{checkoutModal.title}</strong>
            </p>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Creator:</span>
                <span className="font-semibold text-white">{checkoutModal.creatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">License Terms:</span>
                <span className="text-cyan-400 font-medium">{checkoutModal.license}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total (Simulated):</span>
                <span className="text-sm font-bold text-emerald-400">₹{checkoutModal.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setCheckoutModal(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSimulatePurchase(checkoutModal)}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white"
              >
                Confirm Simulated Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
