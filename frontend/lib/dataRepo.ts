import { Project, JobPost, Review, Message } from '@/types';
import { DEMO_PROJECTS, DEMO_JOBS, DEMO_REVIEWS } from '@/lib/mockData';
import { prisma } from '@/lib/prisma';

// In-memory fallbacks
let inMemoryProjects = [...DEMO_PROJECTS];
let inMemoryJobs = [...DEMO_JOBS];
let inMemoryReviews = [...DEMO_REVIEWS];

export interface SavedAIGeneration {
  id: string;
  userId: string;
  toolType: string;
  topic: string;
  output: string;
  createdAt: string;
}

let inMemoryAIGenerations: SavedAIGeneration[] = [];

// 1. Projects
export async function getProjects(): Promise<Project[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      include: {
        client: true,
        creator: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id,
        clientId: p.clientId,
        clientName: p.client.name,
        creatorId: p.creatorId,
        creatorName: p.creator.name,
        creatorAvatar: p.creator.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        serviceId: p.serviceId ?? undefined,
        title: p.title,
        description: p.description,
        budget: p.budget,
        status: p.status as any,
        deadline: p.deadline ? p.deadline.toLocaleDateString() : '5 days',
        progress: p.progress,
        createdAt: p.createdAt.toLocaleDateString(),
      }));
    }
  } catch (error) {
    console.warn('[dataRepo] Failed to fetch projects from database:', error);
  }

  return inMemoryProjects;
}

export async function saveProject(project: Project): Promise<Project> {
  try {
    const created = await prisma.project.create({
      data: {
        id: project.id,
        clientId: project.clientId,
        creatorId: project.creatorId,
        serviceId: project.serviceId || null,
        title: project.title,
        description: project.description,
        budget: project.budget,
        status: (project.status as any) || 'PENDING',
        progress: project.progress || 10,
      },
      include: {
        client: true,
        creator: true,
      },
    });

    return {
      ...project,
      id: created.id,
      clientName: created.client.name,
      creatorName: created.creator.name,
    };
  } catch (error) {
    console.warn('[dataRepo] Failed to save project to database, saving to memory fallback:', error);
  }

  const existingIdx = inMemoryProjects.findIndex((p) => p.id === project.id);
  if (existingIdx !== -1) {
    inMemoryProjects[existingIdx] = project;
  } else {
    inMemoryProjects.unshift(project);
  }
  return project;
}

// 2. Jobs
export async function getJobs(): Promise<JobPost[]> {
  try {
    const dbJobs = await prisma.jobPost.findMany({
      include: {
        client: true,
        applications: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbJobs && dbJobs.length > 0) {
      return dbJobs.map((j) => ({
        id: j.id,
        clientId: j.clientId,
        clientName: j.client.name,
        clientAvatar: j.client.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        title: j.title,
        description: j.description,
        budget: j.budget,
        category: j.category,
        skills: j.skills,
        preferredTools: j.preferredTools,
        deadline: j.deadline ? j.deadline.toLocaleDateString() : '4 days',
        status: j.status as any,
        applicationsCount: j.applications.length,
        createdAt: j.createdAt.toLocaleDateString(),
      }));
    }
  } catch (error) {
    console.warn('[dataRepo] Failed to fetch jobs from database:', error);
  }

  return inMemoryJobs;
}

export async function saveJob(job: JobPost): Promise<JobPost> {
  try {
    const created = await prisma.jobPost.create({
      data: {
        id: job.id,
        clientId: job.clientId,
        title: job.title,
        description: job.description,
        budget: job.budget,
        category: job.category,
        skills: job.skills,
        preferredTools: job.preferredTools,
        status: (job.status as any) || 'OPEN',
      },
      include: { client: true },
    });

    return {
      ...job,
      id: created.id,
      clientName: created.client.name,
    };
  } catch (error) {
    console.warn('[dataRepo] Failed to save job to database, saving to memory fallback:', error);
  }

  const existingIdx = inMemoryJobs.findIndex((j) => j.id === job.id);
  if (existingIdx !== -1) {
    inMemoryJobs[existingIdx] = job;
  } else {
    inMemoryJobs.unshift(job);
  }
  return job;
}

// 3. Reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const dbReviews = await prisma.review.findMany({
      include: {
        reviewer: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbReviews && dbReviews.length > 0) {
      return dbReviews.map((r) => ({
        id: r.id,
        projectId: r.projectId,
        reviewerId: r.reviewerId,
        reviewerName: r.reviewer.name,
        reviewerAvatar: r.reviewer.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        creatorId: r.creatorId,
        rating: r.rating,
        categories: (r.categories as any) || { quality: 5, communication: 5, timeliness: 5, creativity: 5 },
        comment: r.comment,
        createdAt: r.createdAt.toLocaleDateString(),
      }));
    }
  } catch (error) {
    console.warn('[dataRepo] Failed to fetch reviews from database:', error);
  }

  return inMemoryReviews;
}

export async function saveReview(review: Review): Promise<Review> {
  try {
    const created = await prisma.review.create({
      data: {
        id: review.id,
        projectId: review.projectId,
        reviewerId: review.reviewerId,
        creatorId: review.creatorId,
        rating: review.rating,
        categories: review.categories as any,
        comment: review.comment,
      },
      include: { reviewer: true },
    });

    return {
      ...review,
      id: created.id,
      reviewerName: created.reviewer.name,
    };
  } catch (error) {
    console.warn('[dataRepo] Failed to save review to database, saving to memory fallback:', error);
  }

  inMemoryReviews.unshift(review);
  return review;
}

// 4. Saved AI Studio Generations
export async function getSavedGenerations(userId: string): Promise<SavedAIGeneration[]> {
  try {
    const dbSaved = await prisma.savedAIContent.findMany({
      where: userId === 'all' ? {} : { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (dbSaved && dbSaved.length > 0) {
      return dbSaved.map((s) => ({
        id: s.id,
        userId: s.userId,
        toolType: s.toolType,
        topic: s.topic,
        output: s.output,
        createdAt: s.createdAt.toLocaleDateString(),
      }));
    }
  } catch (error) {
    console.warn('[dataRepo] Failed to fetch saved AI content from database:', error);
  }

  return inMemoryAIGenerations.filter((g) => g.userId === userId || userId === 'all');
}

export async function saveAIGeneration(item: SavedAIGeneration): Promise<SavedAIGeneration> {
  try {
    const created = await prisma.savedAIContent.create({
      data: {
        id: item.id,
        userId: item.userId,
        toolType: item.toolType,
        topic: item.topic,
        output: item.output,
      },
    });

    return {
      ...item,
      id: created.id,
    };
  } catch (error) {
    console.warn('[dataRepo] Failed to save AI content to database, saving to memory fallback:', error);
  }

  inMemoryAIGenerations.unshift(item);
  return item;
}

// 5. Workflows
export interface AIWorkflowListing {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  category: string;
  price: number;
  tools: string[];
  inputs: string[];
  outputs: string[];
  license: string;
  purchasesCount: number;
  rating: number;
}

export const DEFAULT_WORKFLOWS: AIWorkflowListing[] = [
  {
    id: 'wf-1',
    title: 'ComfyUI + Flux.1 E-Commerce Product Studio',
    description: 'Automated high-res background replacement and lighting integration node pipeline for commercial catalog photography.',
    creatorId: 'creator-2',
    creatorName: 'Zack Chen',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    category: 'Product Photography',
    price: 1999,
    tools: ['Flux.1 Pro', 'ComfyUI', 'Photoshop AI'],
    inputs: ['Raw product packshot on white backdrop'],
    outputs: ['4K photorealistic lifestyle staging render with shadows'],
    license: 'Commercial Unlimited',
    purchasesCount: 48,
    rating: 4.95,
  },
  {
    id: 'wf-2',
    title: 'Runway Gen-3 Cinema Camera Trajectory Preset Pack',
    description: '30+ tested camera movement prompt formulas with speed ramps, orbit dynamics, and macro tilt-shift cues.',
    creatorId: 'creator-1',
    creatorName: 'Elena Rostova',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    category: 'AI Video',
    price: 2499,
    tools: ['Runway Gen-3', 'Luma Dream Machine'],
    inputs: ['Base keyframe image or Midjourney seed'],
    outputs: ['6-second cinematic video clip ready for timeline assembly'],
    license: 'Personal & Commercial Use',
    purchasesCount: 82,
    rating: 4.98,
  },
  {
    id: 'wf-3',
    title: 'Viral TikTok/Reels Script & Audio Splicer Flow',
    description: 'Multi-step prompt chain producing 3-second retention hooks, retention body pacing, and ElevenLabs emotional emphasis markers.',
    creatorId: 'creator-3',
    creatorName: 'Priya Sharma',
    creatorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    category: 'Content Strategy',
    price: 1299,
    tools: ['Claude 3.5 Sonnet', 'ElevenLabs', 'CapCut'],
    inputs: ['Product URL or concept brief'],
    outputs: ['3x Script variations + Audio timing map'],
    license: 'Commercial Royalty Free',
    purchasesCount: 110,
    rating: 4.97,
  }
];

export async function getWorkflows(): Promise<AIWorkflowListing[]> {
  try {
    const dbWorkflows = await prisma.workflow.findMany({
      include: {
        creator: {
          include: { user: true },
        },
      },
    });

    if (dbWorkflows && dbWorkflows.length > 0) {
      return dbWorkflows.map((w) => ({
        id: w.id,
        title: w.title,
        description: w.description,
        creatorId: w.creatorId,
        creatorName: w.creator.user.name,
        creatorAvatar: w.creator.user.avatar || '',
        category: w.category,
        price: w.price,
        tools: w.tools,
        inputs: w.inputs,
        outputs: w.outputs,
        license: w.license,
        purchasesCount: w.purchasesCount,
        rating: w.rating,
      }));
    }
  } catch (error) {
    console.warn('[dataRepo] Failed to fetch workflows from database:', error);
  }

  return DEFAULT_WORKFLOWS;
}

// 6. Prompts Marketplace
export interface PromptListing {
  id: string;
  title: string;
  description: string;
  category: string;
  model: string;
  price: number;
  exampleOutput: string;
  creatorName: string;
  creatorAvatar: string;
  license: string;
  tags: string[];
}

export const DEFAULT_PROMPTS: PromptListing[] = [
  {
    id: 'pr-1',
    title: 'Photorealistic Luxury Automotive Commercial Shots',
    description: 'Precision Midjourney v6 prompt formula yielding wet asphalt reflections, anamorphic lens flares, and aerodynamic kinematics.',
    category: '3D CGI / Vehicles',
    model: 'Midjourney v6.1',
    price: 499,
    exampleOutput: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    creatorName: 'Elena Rostova',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    license: 'Commercial Non-Exclusive',
    tags: ['Automotive', 'Midjourney', 'Cinematic'],
  },
  {
    id: 'pr-2',
    title: 'Editorial Haute Couture Micro-Texture Portrait Pack',
    description: 'Exact lighting prompts with Hasselblad color profile and skin subsurface scattering.',
    category: 'Fashion & Portraits',
    model: 'Flux.1 Pro',
    price: 699,
    exampleOutput: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    creatorName: 'Zack Chen',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    license: 'Commercial Non-Exclusive',
    tags: ['Fashion', 'Flux.1', 'Editorial'],
  }
];

export async function getPrompts(): Promise<PromptListing[]> {
  try {
    const dbPrompts = await prisma.promptListing.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (dbPrompts && dbPrompts.length > 0) {
      return dbPrompts.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        model: p.model,
        price: p.price,
        exampleOutput: p.exampleOutput,
        creatorName: p.creatorName,
        creatorAvatar: p.creatorAvatar,
        license: p.license,
        tags: p.tags,
      }));
    }
  } catch (error) {
    console.warn('[dataRepo] Failed to fetch prompts from database:', error);
  }

  return DEFAULT_PROMPTS;
}
