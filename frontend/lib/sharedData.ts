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
