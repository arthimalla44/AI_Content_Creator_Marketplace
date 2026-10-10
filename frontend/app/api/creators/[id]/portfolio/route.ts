import { NextResponse } from 'next/server';
import { DEMO_PORTFOLIO } from '@/lib/mockData';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = DEMO_PORTFOLIO.filter((p) => p.creatorId === id);
  return apiSuccess(items);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const newItem = {
    id: `port-${Date.now()}`,
    creatorId: id,
    title: body.title || 'Untitled Creation',
    description: body.description || '',
    category: body.category || 'AI Video Creators',
    imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tags: body.tags || ['Generative AI'],
    toolsUsed: body.toolsUsed || ['Midjourney v6'],
    aiGenerated: true,
    createdAt: 'Just now',
  };

  DEMO_PORTFOLIO.unshift(newItem);
  return apiSuccess(newItem, 'Portfolio item added successfully', 201);
}
