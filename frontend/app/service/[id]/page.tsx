"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { DEMO_SERVICES, DEMO_CREATORS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';
import { Star, Clock, CheckCircle2, ShieldCheck, Sparkles, Bot, IndianRupee, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServiceDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'service-1';

  const service = DEMO_SERVICES.find((s) => s.id === id) || DEMO_SERVICES[0];
  const creator = DEMO_CREATORS.find((c) => c.name === service.creatorName) || DEMO_CREATORS[0];

  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const tierPrices = {
    basic: service.basicPrice,
    standard: service.standardPrice,
    premium: service.premiumPrice,
  };

  const handleOrder = () => {
    setPurchaseSuccess(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link href="/services" className="hover:text-white">Services</Link>
        <span>/</span>
        <span className="text-slate-300">{service.category}</span>
        <span>/</span>
        <span className="text-slate-200 truncate max-w-xs">{service.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Details, Thumbnail, Deliverables */}
        <div className="lg:col-span-2 space-y-8">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {service.title}
            </h1>

            <div className="flex items-center gap-4 mt-4 text-xs">
              <Link href={`/creator/${creator.username}`} className="flex items-center gap-2 hover:opacity-80">
                <img src={service.creatorAvatar} alt={service.creatorName} className="h-7 w-7 rounded-full object-cover border border-slate-700" />
                <span className="font-semibold text-slate-200">{service.creatorName}</span>
              </Link>
              <span className="text-slate-600">|</span>
              <div className="flex items-center text-amber-400 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400 mr-1" />
                {service.rating} ({service.reviewsCount} reviews)
              </div>
            </div>
          </div>

          {/* Hero Thumbnail */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 max-h-[420px]">
            <img src={service.thumbnail} alt={service.title} className="w-full h-full object-cover" />
          </div>

          {/* Service Description */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <h2 className="text-base font-bold text-white">About This Service</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {service.description}
            </p>

            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">What is Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Tools Used */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">AI Pipeline & Hardware</h3>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((t, idx) => (
                <span key={idx} className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-200 flex items-center gap-1.5 font-medium">
                  <Bot className="h-3.5 w-3.5 text-indigo-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pricing Tiers & Checkout Card */}
        <div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sticky top-24 shadow-2xl backdrop-blur-md">
            
            {/* Tier Tabs */}
            <div className="grid grid-cols-3 rounded-xl border border-slate-800 bg-slate-950 p-1 mb-6">
              <button
                onClick={() => setSelectedTier('basic')}
                className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${selectedTier === 'basic' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Basic
              </button>
              <button
                onClick={() => setSelectedTier('standard')}
                className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${selectedTier === 'standard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Standard
              </button>
              <button
                onClick={() => setSelectedTier('premium')}
                className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${selectedTier === 'premium' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Premium
              </button>
            </div>

            {/* Selected Price */}
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider">{selectedTier} Package</span>
              <div className="text-2xl font-extrabold text-white">
                ₹{tierPrices[selectedTier].toLocaleString()}
              </div>
            </div>

            <div className="space-y-3 py-4 border-y border-slate-800 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-400"><Clock className="h-3.5 w-3.5" /> Delivery Time</span>
                <span className="font-semibold text-white">{service.deliveryDays} Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Revisions Included</span>
                <span className="font-semibold text-white">{service.revisions} Revisions</span>
              </div>
            </div>

            {purchaseSuccess ? (
              <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-3">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Package Ordered Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Simulated escrow of ₹{tierPrices[selectedTier].toLocaleString()} is locked. {service.creatorName} has received your order.
                </p>
                <Link
                  href="/dashboard/client"
                  className="block w-full py-2 rounded-lg bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500"
                >
                  View in My Orders
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleOrder}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Order {selectedTier.toUpperCase()} (₹{tierPrices[selectedTier].toLocaleString()})
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  🛡️ Simulated Escrow. Funds are protected until project sign-off.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Need custom requirements?</span>
              <Link href={`/creator/${creator.username}?hire=true`} className="text-cyan-400 hover:underline font-semibold">
                Contact Creator
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
