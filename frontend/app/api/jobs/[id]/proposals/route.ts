import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const proposal = {
    id: `prop-${Date.now()}`,
    jobId: id,
    creatorId: body.creatorId || 'user-creator-1',
    creatorName: body.creatorName || 'Elena Rostova',
    creatorAvatar: body.creatorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    proposal: body.proposal || 'I can deliver this project with high fidelity.',
    price: body.price || 4500,
    deliveryDays: body.deliveryDays || 3,
    status: 'PENDING',
    createdAt: 'Just now',
  };

  return apiSuccess(proposal, 'Proposal submitted successfully', 201);
}
