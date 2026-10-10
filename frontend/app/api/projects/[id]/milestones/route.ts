import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/dataRepo';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const milestone = {
    id: `ms-${Date.now()}`,
    projectId: id,
    title: body.title || 'Project Milestone',
    amount: body.amount || 1000,
    status: 'PENDING',
    dueDate: body.dueDate || '3 days',
    createdAt: new Date().toISOString(),
  };

  return apiSuccess(milestone, 'Milestone created successfully', 201);
}
