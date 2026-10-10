import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const submission = {
    id: `sub-${Date.now()}`,
    challengeId: id,
    submissionUrl: body.submissionUrl,
    notes: body.notes,
    createdAt: 'Just now',
    status: 'SUBMITTED',
  };

  return apiSuccess(submission, 'Challenge entry submitted', 201);
}
