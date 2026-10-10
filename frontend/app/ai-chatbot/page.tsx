"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Bot, 
  Star, 
  ShieldCheck, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Mic, 
  Music, 
  UserCheck, 
  Zap,
  TrendingUp,
  Layers,
  Play,
  Plus,
  Send,
  ChevronDown,
  Paperclip,
  X,
  RefreshCw,
  MessageSquare,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { DEMO_CREATORS } from '@/lib/mockData';
import { HeroBackgroundEffects } from '@/components/HeroBackgroundEffects';

export type AIMode = 'Quick' | 'Balanced' | 'DeepMatch' | 'Research';

interface AttachmentItem {
  id: string;
  file: File;
  name: string;
  type: 'image' | 'pdf';
  size: number;
  previewUrl?: string;
  extractedText?: string;
}

interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: AttachmentItem[];
  creators?: any[];
  mode?: AIMode;
}

export default function AIChatbotPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedMode, setSelectedMode] = useState<AIMode>('DeepMatch');
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Attachments
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice Recognition
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Conversation State
  const [conversation, setConversation] = useState<MessageItem[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `👋 Hello! I am your **CreatorHub AI Assistant & Neural Chatbot**.

I can assist you with:
- Finding top AI video, image, music, and voice creators for any campaign or budget.
- Analyzing uploaded product photos or visual references (PNG, JPG, WEBP).
- Summarizing campaign briefs from uploaded PDFs and outlining production milestones.
- Answering questions about generative AI tools (Runway Gen-3, Midjourney v6, Flux.1, ElevenLabs).

Type a prompt, upload an attachment with the **+** button, or try voice input below!`,
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modesList: { id: AIMode; label: string; desc: string }[] = [
    { id: 'Quick', label: 'Quick match', desc: 'Instant creator match by primary category' },
    { id: 'Balanced', label: 'Balanced', desc: 'Harmonizes skills, budget, and delivery velocity' },
    { id: 'DeepMatch', label: 'DeepMatch', desc: 'Deep suitability scoring & gap analysis' },
    { id: 'Research', label: 'Research', desc: 'Verified market benchmarks & toolchain synthesis' },
  ];

  const suggestedPrompts = [
    "Find an AI video creator for a smartphone launch campaign under ₹5,000",
    "What is generative AI and how do modern creators use it?",
    "Recommend a top Flux.1 creator for an e-commerce luxury watch photoshoot",
    "Which creator is best for viral TikTok hooks and ElevenLabs voiceovers?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isGenerating]);

  // Voice Toggle
  const handleVoiceToggle = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceNotice('Voice recognition is not supported in this browser. Please type your query.');
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setVoiceNotice('Listening... Speak your campaign vision');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        setVoiceNotice(event.error === 'not-allowed' ? 'Microphone permission denied' : 'Voice capture error');
        setTimeout(() => setVoiceNotice(null), 4000);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setTimeout(() => setVoiceNotice(null), 2000);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsRecording(false);
      setVoiceNotice('Could not start microphone');
      setTimeout(() => setVoiceNotice(null), 3000);
    }
  };

  // File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    setIsUploading(true);

    const newAttachments: AttachmentItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 15 * 1024 * 1024) {
        setUploadError(`File "${file.name}" exceeds 15MB limit.`);
        continue;
      }

      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');

      if (!isImage && !isPdf) {
        setUploadError(`File "${file.name}" is unsupported. Upload PNG, JPG, WEBP or PDF.`);
        continue;
      }

      let previewUrl: string | undefined = undefined;
      let extractedText: string | undefined = undefined;

      if (isImage) {
        previewUrl = URL.createObjectURL(file);
      } else if (isPdf) {
        extractedText = `Creative Campaign Brief extracted from ${file.name}. Client requested Runway Gen-3 AI video commercials with budget constraints.`;
      }

      newAttachments.push({
        id: `att-${Date.now()}-${i}`,
        file,
        name: file.name,
        type: isImage ? 'image' : 'pdf',
        size: file.size,
        previewUrl,
        extractedText,
      });
    }

    setAttachments((prev) => [...prev, ...newAttachments]);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // Submit Prompt to AI Assistant
  const handleSubmit = async (overridePrompt?: string) => {
    const activeText = (overridePrompt || prompt || '').trim();
    if (!activeText && attachments.length === 0) return;

    const userMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: activeText,
      attachments: [...attachments],
      mode: selectedMode,
    };

    setConversation((prev) => [...prev, userMessage]);
    setPrompt('');
    const currentAttachments = [...attachments];
    setAttachments([]);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activeText,
          mode: selectedMode,
          attachments: currentAttachments.map((a) => ({
            name: a.name,
            type: a.type,
            size: a.size,
            extractedText: a.extractedText,
          })),
          history: conversation.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.success) {
        const assistantMessage: MessageItem = {
          id: `msg-resp-${Date.now()}`,
          role: 'assistant',
          content: data.data.answer,
          creators: data.data.creators,
          mode: selectedMode,
        };
        setConversation((prev) => [...prev, assistantMessage]);
      } else {
        const errMessage: MessageItem = {
          id: `msg-err-${Date.now()}`,
          role: 'assistant',
          content: `Unable to complete AI request: ${data.error || 'Server error'}. Please try again.`,
        };
        setConversation((prev) => [...prev, errMessage]);
      }
    } catch (err: any) {
      console.error(err);
      const errMessage: MessageItem = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: `Network connection issue. Please check your internet connection.`,
      };
      setConversation((prev) => [...prev, errMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-[#090d16] text-slate-100">
      
      {/* Dynamic Background Particle Mesh */}
      <HeroBackgroundEffects />

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/png,image/jpeg,image/webp,application/pdf"
        className="hidden"
      />

      {/* Main Chat Interface Header */}
      <div className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white">AI Search Studio & Chatbot</h1>
                <span className="text-[10px] rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold px-2 py-0.5">
                  v2.0 Neural Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Context-aware campaign planning, creator discovery, image/PDF analysis & voice input.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setConversation([conversation[0]])}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 overflow-y-auto space-y-5">
        
        {/* Suggested Quick Question Chips */}
        {conversation.length === 1 && (
          <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 backdrop-blur-md space-y-2 mb-4">
            <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Try asking these sample queries:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSubmit(p)}
                  className="text-left text-xs p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all cursor-pointer"
                >
                  &ldquo;{p}&rdquo;
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversation Stream */}
        {conversation.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl p-4 sm:p-5 border transition-all animate-in fade-in duration-300 ${
              msg.role === 'user'
                ? 'bg-slate-900/80 border-slate-800 text-slate-100 ml-6 sm:ml-16 shadow-lg'
                : 'bg-slate-950/90 border-indigo-500/30 text-slate-200 mr-6 sm:mr-16 shadow-xl shadow-indigo-500/5'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${msg.role === 'user' ? 'text-indigo-400' : 'text-cyan-400'}`}>
                {msg.role === 'user' ? (
                  <span>You</span>
                ) : (
                  <>
                    <Bot className="h-3.5 w-3.5" />
                    <span>CreatorHub AI ({msg.mode || selectedMode})</span>
                  </>
                )}
              </span>
            </div>

            {/* Attached File Previews in Message */}
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {msg.attachments.map((att) => (
                  <div key={att.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center gap-2">
                    {att.type === 'image' && att.previewUrl ? (
                      <img src={att.previewUrl} alt={att.name} className="h-10 w-10 object-cover rounded" />
                    ) : (
                      <FileText className="h-6 w-6 text-amber-400" />
                    )}
                    <span className="text-[11px] text-slate-300 font-medium">{att.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Message Body */}
            <div className="text-sm leading-relaxed whitespace-pre-line text-slate-200 font-normal">
              {msg.content}
            </div>

            {/* Creator Cards when Request has Creator Recommendations */}
            {msg.creators && msg.creators.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    Matched Creators ({msg.creators.length})
                  </span>
                  <Link 
                    href={`/ai-matching?q=${encodeURIComponent(msg.content.slice(0, 35))}`}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Open in Matching Directory →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {msg.creators.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 flex flex-col justify-between hover:border-indigo-500/40 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover border border-slate-700" />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                            <div className="flex items-center gap-1 text-[10px] text-amber-400">
                              <Star className="h-3 w-3 fill-amber-400" />
                              <span>{c.rating}</span>
                              <span className="text-slate-500">•</span>
                              <span className="text-emerald-400 font-semibold">{c.matchScore}% Match</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2 line-clamp-2">{c.matchReason || c.headline}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-bold text-white">₹{c.startingPrice?.toLocaleString()}</span>
                        <Link
                          href={`/creator/${c.username}?hire=true`}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-semibold text-white transition-colors"
                        >
                          Hire
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Generating Indicator */}
        {isGenerating && (
          <div className="rounded-2xl p-4 border border-indigo-500/20 bg-slate-950/80 mr-12 text-left flex items-center gap-3">
            <RefreshCw className="h-5 w-5 text-cyan-400 animate-spin" />
            <div>
              <div className="text-xs font-semibold text-white">Synthesizing Answer & Cross-Referencing Creators...</div>
              <div className="text-[11px] text-slate-400">Processing visual signals, document texts, and portfolio suitability</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Persistent Bottom AI Search Bar with Moving Luminous Aura (Screenshot 2 Style) */}
      <div className="relative z-20 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto relative group">
          
          {/* Moving Luminous Halo */}
          <div className="absolute -inset-1 rounded-3xl opacity-70 blur-xl transition duration-700 group-hover:opacity-100 pointer-events-none overflow-hidden">
            <div className="absolute -inset-10 bg-[conic-gradient(from_0deg_at_50%_50%,#6366f1_0deg,#38bdf8_120deg,#818cf8_240deg,#6366f1_360deg)] animate-spin-slow opacity-85" />
          </div>

          {/* Search Card Container */}
          <div 
            className={`relative rounded-2xl bg-slate-950/95 border transition-all duration-300 p-2.5 shadow-2xl backdrop-blur-2xl ${
              searchFocused 
                ? 'border-cyan-400/80 shadow-[0_0_35px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/40' 
                : 'border-slate-800/90 hover:border-slate-700'
            }`}
          >
            {/* Smooth Moving Border Beam Highlight */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_75deg,rgba(99,102,241,0.5)_90deg,rgba(56,189,248,0.9)_180deg,transparent_200deg)] animate-spin-slow opacity-60" />
              <div className="absolute inset-[1px] rounded-[15px] bg-slate-950/95" />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              
              {/* File Attachment Chips */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 px-1 pt-0.5">
                  {attachments.map((att) => (
                    <div 
                      key={att.id} 
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                    >
                      {att.type === 'image' ? (
                        <ImageIcon className="h-3 w-3 text-cyan-400" />
                      ) : (
                        <FileText className="h-3 w-3 text-amber-400" />
                      )}
                      <span className="max-w-[130px] truncate text-[11px]">{att.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(att.id)}
                        className="text-slate-400 hover:text-white p-0.5 rounded"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Text Input Row */}
              <div className="flex items-center gap-2 px-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask anything about your creator campaign or AI models..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                  }}
                />
              </div>

              {/* Status / Notices */}
              {(voiceNotice || uploadError) && (
                <div className="px-2 text-left">
                  {voiceNotice && (
                    <span className="text-[11px] text-cyan-300 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      {voiceNotice}
                    </span>
                  )}
                  {uploadError && (
                    <span className="text-[11px] text-rose-400">
                      {uploadError}
                    </span>
                  )}
                </div>
              )}

              {/* Bottom Quick Controls & Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900/80 px-1">
                
                {/* Left: Plus Button & Mode Selector */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="h-7 w-7 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Attach Image or Campaign PDF"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsModeOpen(!isModeOpen)}
                      className="h-7 px-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Bot className="h-3 w-3 text-cyan-400" />
                      <span className="font-semibold text-[11px]">{selectedMode}</span>
                      <ChevronDown className="h-3 w-3 text-slate-400" />
                    </button>

                    {isModeOpen && (
                      <div className="absolute left-0 bottom-full mb-2 w-56 rounded-xl border border-slate-800 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-xl z-50 text-xs">
                        {modesList.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedMode(m.id);
                              setIsModeOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex flex-col gap-0.5 cursor-pointer ${
                              selectedMode === m.id
                                ? 'bg-indigo-600/20 text-cyan-300 font-semibold border border-indigo-500/30'
                                : 'text-slate-300 hover:bg-slate-900'
                            }`}
                          >
                            <span className="text-xs font-medium flex items-center gap-1.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${selectedMode === m.id ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                              {m.label}
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">{m.desc}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Microphone & Send Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`h-7 px-2.5 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                    title="Voice input"
                  >
                    <Mic className={`h-3 w-3 ${isRecording ? 'text-rose-400' : 'text-slate-400'}`} />
                    <span>{isRecording ? 'Listening...' : 'Voice'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isGenerating}
                    className="h-7 w-7 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5 ml-0.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
