import { NextResponse } from 'next/server';
import { getProjects, saveProject } from '@/lib/dataRepo';
import { apiSuccess, apiError, handleApiError } from '@/lib/apiResponse';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return apiError('Project not found', 'NOT_FOUND', 404);
  }

  return apiSuccess(project);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const projects = await getProjects();
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return apiError('Project not found', 'NOT_FOUND', 404);
    }

    const current = projects[index];
    const updated = {
      ...current,
      ...body,
    };

    await saveProject(updated);
    return apiSuccess(updated, 'Project updated successfully');
  } catch (error: any) {
    return handleApiError(error);
  }
}
