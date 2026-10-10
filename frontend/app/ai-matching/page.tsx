"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  Filter, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  SlidersHorizontal, 
  Bot, 
  MessageSquare, 
  Briefcase, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  Clock, 
  Zap,
  Bookmark,
  Share2,
  TrendingUp,
  RefreshCw,
  X,
  UserCheck
} from 'lucide-react';
import { DEMO_CREATORS, DEMO_SERVICES } from '@/lib/mockData';
import { AIService, AIProjectCopilotResult } from '@/lib/aiService';

function AIMatchingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search Query from URL
  const queryParam = searchParams.get('q') || searchParams.get('query') || '30s product ad with Runway Gen-3 & sound design';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeQuery, setActiveQuery] = useState(queryParam);
  const [loading, setLoading] = useState(true);
  const [copilotAnalysis, setCopilotAnalysis] = useState<AIProjectCopilotResult | null>(null);

  // Filters State
  const [selectedContentType, setSelectedContentType] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [maxBudget, setMaxBudget] = useState(15000);
  const [savedCreators, setSavedCreators] = useState<string[]>([]);
  const [contactModalCreator, setContactModalCreator] = useState<any | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Available Filter Options
  const contentTypes = ['All', 'AI Video Creators', 'AI Image Creators', 'AI Copywriters', 'AI Voice Creators', 'AI Music Creators', 'AI Avatar Creators'];
  const skillOptions = ['All', 'Runway Gen-3', 'Midjourney', 'Flux.1', 'ElevenLabs', 'Claude 3.5 Sonnet', 'HeyGen', 'Suno'];
  const ratingOptions = [
    { label: 'All Ratings', value: 0 },
    { label: '4.8 & Above', value: 4.8 },
    { label: '4.9 & Above', value: 4.9 },
    { label: '5.0 Star Only', value: 5.0 },
  ];

  // Fetch AI Decomposition & Recommendations
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    AIService.runProjectCopilot({ prompt: activeQuery })
      .then((res) => {
        if (isMounted) {
          setCopilotAnalysis(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveQuery(searchQuery);
    router.push(`/ai-matching?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleSave = (id: string) => {
    setSavedCreators((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filter & Score Creators based on AI Query and Selected Filters
  const filteredCreators = DEMO_CREATORS.map((creator) => {
    // Calculate AI match affinity
    let matchScore = 80;
    const reasons: string[] = [];

    const lowerQuery = activeQuery.toLowerCase();
    const toolHits = creator.tools.filter((t) => lowerQuery.includes(t.toLowerCase()));
    if (toolHits.length > 0) {
      matchScore += 12;
      reasons.push(`Mastery in requested tools (${toolHits.join(', ')})`);
    }

    if (creator.category.toLowerCase().includes('video') && (lowerQuery.includes('video') || lowerQuery.includes('ad') || lowerQuery.includes('commercial'))) {
      matchScore += 6;
      reasons.push('Specialized in high-converting commercial video');
    }

    if (creator.rating >= 4.9) {
      matchScore += 2;
      reasons.push(`Top-tier client satisfaction (${creator.rating}/5.0)`);
    }

    matchScore = Math.min(99, matchScore);

    return {
      ...creator,
      calculatedMatchScore: matchScore,
      matchReasonPrimary: reasons[0] || 'High skill synergy with your project scope',
    };
  }).filter((c) => {
    const matchesCategory = selectedContentType === 'All' || c.category === selectedContentType;
    const matchesSkill = selectedSkill === 'All' || c.tools.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()));
    const matchesRating = c.rating >= minRating;
    const matchesPrice = c.startingPrice <= maxBudget;
    return matchesCategory && matchesSkill && matchesRating && matchesPrice;
  }).sort((a, b) => b.calculatedMatchScore - a.calculatedMatchScore);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactModalCreator(null);
      setMessageText('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      
      {/* Search Header Banner */}
      <section className="relative border-b border-slate-800/80 bg-slate-950/60 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        
        {/* Ambient subtle light glow */}
        <div className="absolute top-0 left-1/4 w-96 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-40 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300 font-medium">Search</span>
            <span>/</span>
            <span className="text-indigo-400 font-semibold">AI Creator Matching</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-300 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                <span>Neural Creator Matching Engine</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                AI Matching Results
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                We decomposed your project brief, cross-referenced verified AI model portfolios, and scored the best matching creators for your campaign.
              </p>
            </div>

            {/* Quick Re-Search Input Bar with Animated Glow */}
            <form onSubmit={handleSearchSubmit} className="relative w-full lg:max-w-md group">
              <div className="absolute -inset-0.5 rounded-full opacity-60 blur-md bg-[conic-gradient(from_0deg_at_50%_50%,#f97316_0deg,#6366f1_140deg,#38bdf8_230deg,#f97316_360deg)] animate-spin-slow pointer-events-none" />
              <div className="relative rounded-full bg-slate-950/90 border border-slate-800 p-1 flex items-center shadow-xl">
                <Search className="h-4 w-4 text-indigo-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Update prompt or search new style..."
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-xs hover:opacity-95 transition-opacity"
                >
                  Match
                </button>
              </div>
            </form>
          </div>

          {/* Search Summary Card (Feature 1: User Search Summary Display) */}
          <div className="mt-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/40 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Search Summary & Scope</span>
                    <span className="text-[10px] rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2 py-0.2">
                      Active Brief
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white mt-1">
                    &ldquo;{activeQuery}&rdquo;
                  </p>
                  
                  {copilotAnalysis && (
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="h-3.5 w-3.5 text-cyan-400" />
                        Est. Timeline: <strong className="text-white">{copilotAnalysis.estimatedTimeline}</strong>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                        Est. Budget: <strong className="text-emerald-400">₹{copilotAnalysis.estimatedBudget.toLocaleString()}</strong>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">
                        Format: <strong className="text-indigo-300">{copilotAnalysis.recommendedFormat}</strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Toolchain Badges */}
              {copilotAnalysis && (
                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-1.5 shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Decomposed AI Toolchain</span>
                  <div className="flex flex-wrap gap-1">
                    {copilotAnalysis.recommendedTools.map((t, idx) => (
                      <span key={idx} className="rounded-lg bg-indigo-500/20 px-2.5 py-1 text-[11px] font-medium text-cyan-300 border border-indigo-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area: Filters Sidebar + Creator Recommendations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar (Feature 4: Filters: Budget, skills, rating, content type) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sticky top-24 backdrop-blur-md shadow-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
                  <span>Filters</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedContentType('All');
                    setSelectedSkill('All');
                    setMinRating(0);
                    setMaxBudget(15000);
                  }}
                  className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* 1. Content Type Filter */}
              <div className="pt-4 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Content Type</label>
                <select
                  value={selectedContentType}
                  onChange={(e) => setSelectedContentType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {contentTypes.map((type) => (
                    <option key={type} value={type} className="bg-slate-900">{type}</option>
                  ))}
                </select>
              </div>

              {/* 2. Skills / Toolchain Filter */}
              <div className="pt-4 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">AI Tools & Skills</label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {skillOptions.map((skill) => (
                    <option key={skill} value={skill} className="bg-slate-900">{skill}</option>
                  ))}
                </select>
              </div>

              {/* 3. Minimum Rating Filter */}
              <div className="pt-4 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Creator Rating</label>
                <div className="space-y-1.5">
                  {ratingOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setMinRating(opt.value)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        minRating === opt.value
                          ? 'bg-indigo-600/30 border border-indigo-500/50 text-white font-semibold'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Star className={`h-3.5 w-3.5 ${opt.value > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Maximum Budget Filter */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-300">Max Starting Rate</label>
                  <span className="font-bold text-emerald-400">₹{maxBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={20000}
                  step={500}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹2,000</span>
                  <span>₹20,000</span>
                </div>
              </div>

              {/* Match Trust Badge */}
              <div className="mt-6 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>All listed creators have verified sample workflows and milestone escrow protection.</span>
              </div>

            </div>
          </div>

          {/* Creators Section (Features 2 & 3: AI Recommendations + Creator Cards) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Results Counter and Status */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h2 className="text-base font-bold text-white">
                  AI Recommended Creators ({filteredCreators.length})
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Sorted by AI Compatibility Match
              </span>
            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="rounded-2xl border border-indigo-500/20 bg-slate-900/40 p-12 text-center">
                <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin mx-auto mb-3" />
                <p className="text-sm font-semibold text-white">Synthesizing Creator Portfolios & Match Scores...</p>
                <p className="text-xs text-slate-400 mt-1">Evaluating tool mastery, past reviews, and turnaround efficiency</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredCreators.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
                <Bot className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No creators match your exact filter combination</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try broadening your budget slider or resetting category filters to see more generative experts.
                </p>
                <button
                  onClick={() => {
                    setSelectedContentType('All');
                    setSelectedSkill('All');
                    setMinRating(0);
                    setMaxBudget(15000);
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Creator Cards Grid with Interactive Animations */}
            {!loading && (
              <div className="space-y-4">
                {filteredCreators.map((creator, index) => {
                  const creatorService = DEMO_SERVICES.find((s) => s.creatorId === creator.id);

                  return (
                    <div
                      key={creator.id}
                      className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-0.5"
                    >
                      {/* Subtle card glow on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-cyan-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                        
                        {/* Left Info: Avatar, Name, Rating, Headline, Skills */}
                        <div className="flex items-start gap-4 flex-1">
                          
                          {/* Profile Image with Online Indicator */}
                          <div className="relative shrink-0">
                            <img
                              src={creator.avatar}
                              alt={creator.name}
                              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-indigo-400 transition-colors shadow-md"
                            />
                            {creator.online && (
                              <span 
                                className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" 
                                title="Online now" 
                              />
                            )}
                          </div>

                          {/* Details */}
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {creator.name}
                              </h3>
                              {creator.verified && (
                                <span title="Verified Creator">
                                  <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
                                </span>
                              )}
                              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-slate-700">
                                {creator.category}
                              </span>
                              
                              {/* AI Compatibility Badge */}
                              <div className="ml-auto md:ml-0 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                                <Sparkles className="h-3 w-3" />
                                <span>{creator.calculatedMatchScore}% Match</span>
                              </div>
                            </div>

                            <p className="text-xs font-medium text-slate-300">
                              {creator.headline}
                            </p>

                            {/* Ratings & Project Statistics */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                              <span className="flex items-center text-amber-400 font-bold">
                                <Star className="h-3.5 w-3.5 fill-amber-400 mr-1" />
                                {creator.rating}
                                <span className="text-slate-400 font-normal ml-1">({creator.reviewCount} reviews)</span>
                              </span>
                              <span>•</span>
                              <span>{creator.totalProjects} completed projects</span>
                              <span>•</span>
                              <span className="text-emerald-400">{creator.completionRate}% completion</span>
                            </div>

                            {/* AI Match Reason Subtext */}
                            <p className="text-[11px] text-cyan-400/90 flex items-center gap-1 font-medium pt-1">
                              <CheckCircle2 className="h-3 w-3 shrink-0" />
                              <span>{creator.matchReasonPrimary}</span>
                            </p>

                            {/* Creator Skills / Tools Badges */}
                            <div className="pt-2 flex flex-wrap gap-1.5">
                              {creator.tools.map((tool, idx) => (
                                <span
                                  key={idx}
                                  className="rounded-lg bg-slate-800/90 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700/80 group-hover:border-slate-600 transition-colors"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>

                            {/* Available Services Preview */}
                            {creatorService && (
                              <div className="pt-2 text-[11px] text-slate-400">
                                <span className="text-slate-500">Popular Service: </span>
                                <strong className="text-slate-200">{creatorService.title}</strong>
                                <span className="text-slate-500 ml-1">({creatorService.deliveryDays}d delivery)</span>
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Right Section: Price & Action Buttons (Features 5, 6, 7: View Profile, Contact, Hire) */}
                        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 gap-3 shrink-0">
                          
                          {/* Price Display */}
                          <div className="text-left md:text-right">
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Starting from</span>
                            <div className="text-lg sm:text-xl font-extrabold text-white flex items-center md:justify-end gap-0.5">
                              <span>₹{creator.startingPrice.toLocaleString()}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">per project milestone</span>
                          </div>

                          {/* Action Buttons: View Profile, Contact, Hire Creator */}
                          <div className="flex items-center gap-2">
                            
                            {/* 1. Bookmark / Save */}
                            <button
                              type="button"
                              onClick={() => toggleSave(creator.id)}
                              className={`p-2 rounded-xl border transition-colors ${
                                savedCreators.includes(creator.id)
                                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                                  : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                              }`}
                              title={savedCreators.includes(creator.id) ? 'Saved' : 'Save Creator'}
                            >
                              <Bookmark className={`h-4 w-4 ${savedCreators.includes(creator.id) ? 'fill-indigo-400' : ''}`} />
                            </button>

                            {/* 2. Contact Creator (Feature 6: Contact Creator Modal) */}
                            <button
                              type="button"
                              onClick={() => setContactModalCreator(creator)}
                              className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                            >
                              <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                              <span>Contact</span>
                            </button>

                            {/* 3. View Profile (Feature 5: View Profile Details) */}
                            <Link
                              href={`/creator/${creator.username}`}
                              className="px-3 py-2 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
                            >
                              Profile
                            </Link>

                            {/* 4. Hire Creator (Feature 7: Direct Project Hire) */}
                            <Link
                              href={`/creator/${creator.username}?hire=true&hiringPrompt=${encodeURIComponent(activeQuery)}`}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <Zap className="h-3.5 w-3.5" />
                              <span>Hire</span>
                            </Link>

                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Interactive Contact Creator Modal */}
      {contactModalCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={contactModalCreator.avatar}
                  alt={contactModalCreator.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">Contact {contactModalCreator.name}</h3>
                  <span className="text-[11px] text-slate-400">{contactModalCreator.responseTime} response time</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setContactModalCreator(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {messageSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
                <p className="text-xs text-slate-400">
                  {contactModalCreator.name} will receive your project brief and reply directly in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Project Subject / Scope
                  </label>
                  <input
                    type="text"
                    defaultValue={`Inquiry regarding: ${activeQuery.slice(0, 45)}...`}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Your Message / Creative Vision
                  </label>
                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Hi ${contactModalCreator.name}, I loved your AI portfolio and would like to discuss my project requirement for: ${activeQuery}`}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">Escrow milestones enabled upon hiring</span>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-xs font-bold text-white hover:opacity-95 transition-opacity"
                  >
                    Send Direct Message
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

export default function AIMatchingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-6 w-6 text-cyan-400 animate-spin" />
          <span className="text-sm font-semibold">Loading AI Creator Matching Engine...</span>
        </div>
      </div>
    }>
      <AIMatchingContent />
    </Suspense>
  );
}
