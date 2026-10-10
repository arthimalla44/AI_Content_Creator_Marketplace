import { NextResponse } from 'next/server';
import { getJobs } from '@/lib/dataRepo';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobs = await getJobs();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return apiError('Job not found', 'NOT_FOUND', 404);
  }

  return apiSuccess(job);
}
