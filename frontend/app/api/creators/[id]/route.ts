import { NextResponse } from 'next/server';
import { DEMO_CREATORS, DEMO_PORTFOLIO } from '@/lib/mockData';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const creator = DEMO_CREATORS.find(
    (c) => c.id === id || c.username.toLowerCase() === id.toLowerCase() || c.userId === id
  );

  if (!creator) {
    return apiError('Creator not found', 'NOT_FOUND', 404);
  }

  const portfolio = DEMO_PORTFOLIO.filter((p) => p.creatorId === creator.id);

  return apiSuccess({
    ...creator,
    portfolio,
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const creatorIndex = DEMO_CREATORS.findIndex(
    (c) => c.id === id || c.username.toLowerCase() === id.toLowerCase() || c.userId === id
  );

  if (creatorIndex === -1) {
    return apiError('Creator not found', 'NOT_FOUND', 404);
  }

  const updated = {
    ...DEMO_CREATORS[creatorIndex],
    ...body,
  };

  DEMO_CREATORS[creatorIndex] = updated;

  return apiSuccess(updated, 'Creator profile updated successfully');
}
