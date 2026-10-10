import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

const DEMO_COLLABORATIONS = [
  {
    id: 'collab-1',
    title: '30s Neo-Tokyo Luxury Watch Commercial',
    ownerName: 'Elena Rostova',
    seekingRoles: ['AI Sound Designer', 'Colorist'],
    description: 'Directing Runway Gen-3 camera sweeps and Midjourney keyframes. Looking for an audio engineer.',
    status: 'OPEN',
    membersCount: 2,
  },
  {
    id: 'collab-2',
    title: 'E-Commerce AI Fashion Campaign (Spring 2026)',
    ownerName: 'Zack Chen',
    seekingRoles: ['AI Copywriter', 'Motion Graphics Artist'],
    description: 'Generating 20 photorealistic catalog models using Flux.1. Need punchy captions.',
    status: 'OPEN',
    membersCount: 1,
  }
];

export async function GET() {
  return apiSuccess(DEMO_COLLABORATIONS);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCollab = {
    id: `collab-${Date.now()}`,
    title: body.title,
    ownerName: body.ownerName || 'Creator',
    seekingRoles: body.seekingRoles || ['Collaborator'],
    description: body.description,
    status: 'OPEN',
    membersCount: 1,
  };
  DEMO_COLLABORATIONS.unshift(newCollab);
  return apiSuccess(newCollab, 'Collaboration request published', 201);
}
