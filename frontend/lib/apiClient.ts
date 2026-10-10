/**
 * CreatorHub AI - Centralized Typed API Client
 * Seamlessly interfaces frontend pages with production Next.js route handlers.
 */

import { User, CreatorProfile, Service, Project, JobPost, Review, Message, Conversation } from '@/types';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    const json = await res.json();
    if (!res.ok || json.success === false) {
      throw new Error(json.error?.message || json.error || 'API Request failed');
    }

    return json.data !== undefined ? json.data : json;
  }

  // Auth
  async login(credentials: { email: string; password: string; rememberMe?: boolean }) {
    return this.request<{ user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: { name: string; email: string; password: string; confirmPassword: string; role: string }) {
    return this.request<{ user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async me() {
    return this.request<{ user: User }>('/api/auth/me');
  }

  async logout() {
    return this.request('/api/auth/logout', { method: 'POST' });
  }

  // Creators
  async getCreators(params?: { category?: string; search?: string }) {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<CreatorProfile[]>(`/api/creators${q ? `?${q}` : ''}`);
  }

  async getCreator(id: string) {
    return this.request<CreatorProfile & { portfolio: any[] }>(`/api/creators/${id}`);
  }

  // Projects
  async getProjects(params?: { clientId?: string; creatorId?: string }) {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<Project[]>(`/api/projects${q ? `?${q}` : ''}`);
  }

  async createProject(data: Partial<Project>) {
    return this.request<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Jobs
  async getJobs() {
    return this.request<JobPost[]>('/api/jobs');
  }

  async createJob(data: Partial<JobPost>) {
    return this.request<JobPost>('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // AI Services
  async runAICopilot(data: { prompt: string; budget?: number; deadline?: string }) {
    return this.request<any>('/api/ai/copilot', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async runAIMatch(data: { brief: string; budget?: number }) {
    return this.request<any>('/api/ai/match', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateStudio(data: { toolType: string; topic: string; platform?: string; tone?: string }) {
    return this.request<any>('/api/ai/studio', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Workflows & Prompts
  async getWorkflows() {
    return this.request<any[]>('/api/workflows');
  }

  async getPrompts() {
    return this.request<any[]>('/api/prompts');
  }

  // Challenges & Collabs
  async getChallenges() {
    return this.request<any[]>('/api/challenges');
  }

  async getCollaborations() {
    return this.request<any[]>('/api/collaboration');
  }

  // Dashboards
  async getClientDashboard() {
    return this.request<any>('/api/dashboard/client');
  }

  async getCreatorDashboard() {
    return this.request<any>('/api/dashboard/creator');
  }

  async getAdminDashboard() {
    return this.request<any>('/api/dashboard/admin');
  }
}

export const api = new ApiClient();
