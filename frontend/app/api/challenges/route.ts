import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

const DEMO_CHALLENGES = [
  {
    id: 'ch-1',
    title: 'Neon Cyberpunk Kinetic Commercial',
    category: 'AI Video',
    rewardText: '₹25,000 Demo Prize + Elite Creator Badge',
    deadline: '3 Days Remaining',
    participantsCount: 38,
  },
  {
    id: 'ch-2',
    title: 'Photorealistic Luxury Fashion Catalogue',
    category: 'AI Imagery',
    rewardText: '₹15,000 Demo Prize + Featured Showcase',
    deadline: '5 Days Remaining',
    participantsCount: 52,
  }
];

export async function GET() {
  return apiSuccess(DEMO_CHALLENGES);
}

export async function POST(req: Request) {
  const body = await req.json();
  const challenge = {
    id: `ch-${Date.now()}`,
    ...body,
    participantsCount: 0,
  };
  DEMO_CHALLENGES.unshift(challenge);
  return apiSuccess(challenge, 'Challenge created', 201);
}
