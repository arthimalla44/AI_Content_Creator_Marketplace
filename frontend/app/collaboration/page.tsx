"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  UserPlus, 
  CheckCircle2, 
  MessageSquare, 
  FolderPlus, 
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { DEMO_CREATORS } from '@/lib/mockData';

interface CollabProject {
  id: string;
  title: string;
  ownerName: string;
  ownerAvatar: string;
  seekingRoles: string[];
  description: string;
  tools: string[];
  membersCount: number;
}

const DEMO_COLLABS: CollabProject[] = [
  {
    id: 'collab-1',
    title: '30s Neo-Tokyo Luxury Watch Commercial',
    ownerName: 'Elena Rostova',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    seekingRoles: ['AI Sound Designer (ElevenLabs/Suno)', 'Colorist'],
    description: 'I am directing the Runway Gen-3 camera sweeps and Midjourney keyframes. Looking for an audio engineer to create a custom bass-heavy ambient synthetic score.',
    tools: ['Runway Gen-3', 'Midjourney v6', 'Suno', 'ElevenLabs'],
    membersCount: 2,
  },
  {
    id: 'collab-2',
    title: 'E-Commerce AI Fashion Campaign (Spring 2026)',
    ownerName: 'Zack Chen',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    seekingRoles: ['AI Copywriter', 'Motion Graphics Artist'],
    description: 'Generating 20 photorealistic editorial catalog models using Flux.1 LoRAs. Need punchy Instagram carousel captions and typography motion graphics.',
    tools: ['Flux.1 Pro', 'Photoshop AI', 'Claude 3.5 Sonnet'],
    membersCount: 1,
  }
];

export default function CollaborationPage() {
  const [collabs, setCollabs] = useState<CollabProject[]>(DEMO_COLLABS);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [seeking, setSeeking] = useState('AI Voice Artist');

  const handleApply = (id: string) => {
    setAppliedIds([...appliedIds, id]);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCollab: CollabProject = {
      id: `collab-${Date.now()}`,
      title,
      ownerName: 'Elena Rostova',
      ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      seekingRoles: [seeking],
      description,
      tools: ['Runway Gen-3', 'Midjourney', 'ElevenLabs'],
      membersCount: 1,
    };
    setCollabs([newCollab, ...collabs]);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 p-6 sm:p-10 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/20">
            <Users className="h-3.5 w-3.5 text-cyan-400" />
            Creator Studio Collaboration & Multi-Disciplinary Teams
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Open Creator Collaboration Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Team up with fellow AI video directors, voice synthesizers, and prompt artists. Combine skills to deliver large commercial campaigns.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-indigo-600/30"
        >
          <FolderPlus className="h-4 w-4" />
          Publish Collaboration Request
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collabs.map((collab) => {
          const isApplied = appliedIds.includes(collab.id);

          return (
            <div
              key={collab.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={collab.ownerAvatar} alt={collab.ownerName} className="h-10 w-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{collab.ownerName}</h3>
                    <span className="text-[11px] text-slate-400">Project Lead</span>
                  </div>
                </div>

                <h2 className="text-base font-bold text-white mb-2">{collab.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{collab.description}</p>

                {/* Seeking Roles */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1.5">
                    Looking for Collaborators:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {collab.seekingRoles.map((role, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-cyan-950/60 border border-cyan-500/30 text-cyan-200">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {collab.tools.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">{collab.membersCount} Active Team Members</span>
                {isApplied ? (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Request Sent
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(collab.id)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5"
                  >
                    <UserPlus className="h-3.5 w-3.5" /> Apply to Collaborate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
            <h3 className="text-lg font-bold text-white mb-1">Post Collaboration Request</h3>
            <p className="text-xs text-slate-400 mb-4">Invite other specialized AI creators to your project workspace.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 30s Kinetic Ad for D2C Brand"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Required Specialist Role</label>
                <input
                  type="text"
                  required
                  value={seeking}
                  onChange={(e) => setSeeking(e.target.value)}
                  placeholder="e.g. AI Voice Synthesizer, 3D CGI Artist"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Project Overview & What You Need</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your current stage and how you plan to split milestones..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white"
                >
                  Publish Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
