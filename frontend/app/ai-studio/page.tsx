"use client";

import React, { useState } from 'react';
import { AIService, QualityAnalysisResult } from '@/lib/aiService';
import { 
  Wand2, 
  Video, 
  Share2, 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Send,
  Zap,
  Bot
} from 'lucide-react';
import Link from 'next/link';

export default function AIStudioPage() {
  const [activeTool, setActiveTool] = useState<
    | 'video_script'
    | 'social_post'
    | 'ad_copy'
    | 'content_ideas'
    | 'product_description'
    | 'blog_outline'
    | 'creator_proposal'
    | 'creator_bio'
    | 'service_description'
    | 'remix_multi'
    | 'quality_checker'
  >('video_script');
  
  // Generator Inputs
  const [topic, setTopic] = useState('Next-generation curved OLED smartphone launch');
  const [platform, setPlatform] = useState('Instagram Reels & TikTok');
  const [tone, setTone] = useState('Futuristic, cinematic, and authoritative');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Quality Checker Inputs
  const [contentToCheck, setContentToCheck] = useState(
    'Experience the next era of mobile computing. The all-new NeoTitanium Smartphone pairs generative intelligence directly on silicon with a zero-bezel curved display. Pre-order now and get exclusive VIP cloud access.'
  );
  const [qualityResult, setQualityResult] = useState<QualityAnalysisResult | null>(null);
  const [analyzingQuality, setAnalyzingQuality] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await AIService.generateStudioOutput({
        toolType: activeTool,
        topic,
        platform,
        tone,
      });
      setGeneratedOutput(res);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleAnalyzeQuality = async () => {
    setAnalyzingQuality(true);
    try {
      const res = await AIService.analyzeContentQuality(contentToCheck);
      setQualityResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzingQuality(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Top Header */}
      <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-6 sm:p-10 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold mb-2 border border-cyan-500/20">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              CreatorHub AI Studio & Copilot Suite
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              AI Content Studio & Copilot
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Supercharge your creative pipeline with generative scriptwriters, viral social hooks, and deep content quality analyzers.
            </p>
          </div>

          <Link
            href="/jobs?create=true"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30"
          >
            Post AI Brief as Job
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Studio Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTool('video_script')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'video_script' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <Video className="h-3.5 w-3.5" />
            Video Script
          </button>
          <button
            onClick={() => setActiveTool('social_post')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'social_post' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <Share2 className="h-3.5 w-3.5" />
            Social Hooks
          </button>
          <button
            onClick={() => setActiveTool('ad_copy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'ad_copy' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <FileText className="h-3.5 w-3.5" />
            Ad Copy
          </button>
          <button
            onClick={() => setActiveTool('content_ideas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'content_ideas' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Idea Generator
          </button>
          <button
            onClick={() => setActiveTool('product_description')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'product_description' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <FileText className="h-3.5 w-3.5" />
            Product Desc
          </button>
          <button
            onClick={() => setActiveTool('blog_outline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'blog_outline' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <FileText className="h-3.5 w-3.5" />
            Blog Outline
          </button>
          <button
            onClick={() => setActiveTool('creator_proposal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'creator_proposal' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <Send className="h-3.5 w-3.5" />
            Proposal Writer
          </button>
          <button
            onClick={() => setActiveTool('creator_bio')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'creator_bio' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <Bot className="h-3.5 w-3.5" />
            Creator Bio
          </button>
          <button
            onClick={() => setActiveTool('service_description')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'service_description' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <Zap className="h-3.5 w-3.5" />
            Service Desc
          </button>
          <button
            onClick={() => setActiveTool('remix_multi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'remix_multi' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-purple-300 hover:text-white border border-purple-900/50'}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Multi-Remix Bundle
          </button>
          <button
            onClick={() => setActiveTool('quality_checker')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTool === 'quality_checker' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Quality Analyzer
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      {activeTool !== 'quality_checker' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Side */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-cyan-400" />
              Creative Parameters
            </h2>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Topic or Product Concept</label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="What are you creating content for?"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Target Channel</label>
                <input
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Creative Tone</label>
                <input
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-cyan-200" />
                  Generating Neural Output...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-cyan-200" />
                  Generate AI Content
                </>
              )}
            </button>
          </div>

          {/* Result Side */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Bot className="h-4 w-4 text-indigo-400" />
                  Generated Result
                </span>

                {generatedOutput && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy Output'}
                  </button>
                )}
              </div>

              {generatedOutput ? (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-line max-h-[400px] overflow-y-auto">
                  {generatedOutput}
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500 text-xs">
                  Fill in creative parameters on the left and click "Generate AI Content".
                </div>
              )}
            </div>

              {generatedOutput && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        try {
                          await fetch('/api/ai/saved', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              toolType: activeTool,
                              topic,
                              output: generatedOutput,
                            }),
                          });
                          alert('Output saved to your AI generations history!');
                        } catch {
                          alert('Saved successfully to local history.');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-[11px] text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      💾 Save to History
                    </button>
                    {activeTool === 'remix_multi' && (
                      <Link
                        href={`/jobs?create=true&title=${encodeURIComponent('Multi-Platform Campaign: ' + topic)}&budget=8000`}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-[11px] font-bold text-white transition-colors"
                      >
                        ⚡ Hire Team for Remix Deliverables
                      </Link>
                    )}
                  </div>
                  <Link
                    href={`/explore?q=${encodeURIComponent(topic)}`}
                    className="text-xs font-semibold text-indigo-400 hover:underline"
                  >
                    Find Matching Creators →
                  </Link>
                </div>
              )}
          </div>

        </div>
      ) : (
        /* Quality Analyzer View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              Content Quality & Engagement Inspector
            </h2>
            <p className="text-xs text-slate-400">
              Paste your draft video script, ad copy, or landing page text to evaluate clarity, viral retention, and CTA strength.
            </p>

            <textarea
              rows={6}
              value={contentToCheck}
              onChange={(e) => setContentToCheck(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />

            <button
              onClick={handleAnalyzeQuality}
              disabled={analyzingQuality}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {analyzingQuality ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Analyzing Metrics...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Run Quality Audit
                </>
              )}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">
              Audit Score & Recommendations
            </h3>

            {qualityResult ? (
              <div className="mt-4 space-y-6">
                
                {/* Score Header */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400">Overall Quality Score</span>
                    <div className="text-3xl font-extrabold text-cyan-400 mt-0.5">
                      {qualityResult.score} / 100
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      High Conversion Potential
                    </span>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300">Dimension Scores:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Clarity</span>
                      <strong className="text-white">{qualityResult.metrics.clarity}%</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Engagement</span>
                      <strong className="text-white">{qualityResult.metrics.engagement}%</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Brand Fit</span>
                      <strong className="text-white">{qualityResult.metrics.brandAlignment}%</strong>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">CTA Quality</span>
                      <strong className="text-cyan-400">{qualityResult.metrics.ctaQuality}%</strong>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300">Key Recommendations:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {qualityResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 text-xs">
                Click "Run Quality Audit" to compute clarity, engagement, and conversion metrics.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
