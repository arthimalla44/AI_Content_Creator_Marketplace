import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return apiSuccess({ joined: true, collaborationId: id }, 'Join request submitted', 200);
}
