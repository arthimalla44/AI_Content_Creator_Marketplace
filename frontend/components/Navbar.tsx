"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { 
  Sparkles, 
  Search, 
  Bell, 
  MessageSquare, 
  User as UserIcon, 
  Menu, 
  X,
  ChevronDown,
  Layers,
  Briefcase,
  Wand2,
  ShieldCheck,
  Bot,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, loginAs, logout, setUserDirectly } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Sparkles className="h-5 w-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                CreatorHub <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/explore" 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Explore
            </Link>
            <Link 
              href="/creators" 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Creators
            </Link>
            <Link 
              href="/services" 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/jobs" 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Jobs
            </Link>
            <Link 
              href="/workflows" 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Workflows
            </Link>
            <Link 
              href="/prompts" 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Prompts
            </Link>
            <Link 
              href="/challenges" 
              className="px-3 py-2 text-sm font-medium text-amber-300 hover:text-amber-200 hover:bg-amber-950/30 rounded-lg transition-colors"
            >
              Challenges
            </Link>
            <Link 
              href="/collaboration" 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Collabs
            </Link>
            <Link 
              href="/ai-studio" 
              className="px-3 py-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/40 rounded-lg transition-colors flex items-center gap-1.5 border border-cyan-500/20"
            >
              <Wand2 className="h-4 w-4" />
              AI Studio
            </Link>
            <Link 
              href="/ai-chatbot" 
              className="relative group px-3 py-1.5 text-sm font-bold text-white rounded-lg transition-all flex items-center gap-1.5 overflow-hidden border border-indigo-500/40 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80 hover:border-cyan-400/80 shadow-md shadow-indigo-500/20"
            >
              <span className="absolute -inset-1 rounded-lg opacity-40 blur-sm bg-[conic-gradient(from_0deg_at_50%_50%,#6366f1_0deg,#38bdf8_180deg,#6366f1_360deg)] animate-spin-slow pointer-events-none group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-cyan-400 animate-pulse" />
                <span className="bg-gradient-to-r from-indigo-300 via-cyan-200 to-white bg-clip-text text-transparent font-bold">
                  AI Chatbot
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </Link>
          </nav>
        </div>

        {/* Right Action Icons & Auth Profile */}
        <div className="flex items-center gap-3">
          
          {/* Demo Role Switcher (Hackathon Favorite) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Role: <strong className="text-white">{role}</strong></span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {demoMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-xl shadow-black/50 z-50">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Demo Account
                </div>
                <button
                  onClick={() => { loginAs('CLIENT'); setDemoMenuOpen(false); }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center gap-2 ${role === 'CLIENT' ? 'bg-indigo-600/30 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
                  Client (Aarav Mehta)
                </button>
                <button
                  onClick={() => { loginAs('CREATOR'); setDemoMenuOpen(false); }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center gap-2 ${role === 'CREATOR' ? 'bg-indigo-600/30 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  Creator (Elena Rostova)
                </button>
                <button
                  onClick={() => { loginAs('ADMIN'); setDemoMenuOpen(false); }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center gap-2 ${role === 'ADMIN' ? 'bg-indigo-600/30 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  Admin Dashboard
                </button>
              </div>
            )}
          </div>

          <Link
            href="/messages"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative"
            title="Messages"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400"></span>
          </Link>

          <Link
            href="/notifications"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500"></span>
          </Link>

          {/* Auth Action or Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl border border-slate-700 bg-slate-900/90 hover:border-indigo-500 hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="user-menu-button"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-lg object-cover border border-slate-700"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm">
                    {user.name ? user.name.slice(0, 2) : 'CH'}
                  </div>
                )}
                <div className="hidden lg:flex flex-col text-left pr-1.5">
                  <span className="text-xs font-semibold text-white truncate max-w-[110px]">{user.name}</span>
                  <span className="text-[10px] text-indigo-400 capitalize">{role.toLowerCase()}</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 mr-1" />
              </button>

              {userMenuOpen && (
                <div
                  id="user-account-menu"
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/80 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {/* User Profile Header Card */}
                  <div className="p-3 border-b border-slate-800/80 mb-1 rounded-xl bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <div className="relative group/avatar shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-xl object-cover border border-slate-700 shadow-md" />
                        ) : (
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold uppercase shadow-md">
                            {user.name ? user.name.slice(0, 2) : 'CH'}
                          </div>
                        )}
                        <label
                          htmlFor="avatar-gallery-upload"
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 rounded-xl flex flex-col items-center justify-center text-white cursor-pointer transition-opacity text-[9px] font-semibold"
                          title="Change photo from gallery"
                        >
                          <span>Change</span>
                        </label>
                        <input
                          id="avatar-gallery-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = async () => {
                              const base64 = reader.result as string;
                              try {
                                const res = await fetch('/api/auth/avatar', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ avatar: base64 }),
                                });
                                const data = await res.json();
                                if (data.success && data.user) {
                                  setUserDirectly(data.user);
                                }
                              } catch (err) {
                                console.error('Failed to upload avatar:', err);
                              }
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate mb-1.5">{user.email}</p>
                        <label
                          htmlFor="avatar-gallery-upload"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 cursor-pointer shadow-sm transition-all hover:scale-[1.02]"
                        >
                          <Sparkles className="h-3 w-3 text-cyan-400" />
                          <span>Upload Photo</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="space-y-0.5 py-1">
                    <Link
                      href={role === 'ADMIN' ? '/admin' : role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/client'}
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      role="menuitem"
                    >
                      <Layers className="h-4 w-4 text-indigo-400" />
                      <span>{role === 'CREATOR' ? 'Creator Studio & Orders' : role === 'ADMIN' ? 'Admin Dashboard' : 'Client Projects & Escrow'}</span>
                    </Link>

                    <Link
                      href="/messages"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      role="menuitem"
                    >
                      <MessageSquare className="h-4 w-4 text-cyan-400" />
                      <span>Direct Messages</span>
                    </Link>

                    <Link
                      href="/ai-studio"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      role="menuitem"
                    >
                      <Wand2 className="h-4 w-4 text-purple-400" />
                      <span>AI Content Studio</span>
                    </Link>
                  </div>

                  {/* Sign Out Button */}
                  <div className="border-t border-slate-800/80 mt-1 pt-1">
                    <button
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors font-medium"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col gap-2">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Explore Marketplace
            </Link>
            <Link
              href="/creators"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Creators
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Services
            </Link>
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Jobs
            </Link>
            <Link
              href="/ai-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-950/40 rounded-lg flex items-center gap-2"
            >
              <Wand2 className="h-4 w-4" />
              AI Studio & Copilot
            </Link>
            <Link
              href="/ai-chatbot"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-white bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600/50 rounded-lg flex items-center gap-2"
            >
              <Bot className="h-4 w-4 text-cyan-400" />
              AI Chatbot Studio
            </Link>
            <Link
              href={role === 'ADMIN' ? '/admin' : role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/client'}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-indigo-400 hover:bg-indigo-950/40 rounded-lg"
            >
              Go to {role} Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
