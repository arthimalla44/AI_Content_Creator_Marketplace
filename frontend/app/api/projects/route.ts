import { NextResponse } from 'next/server';
import { getProjects, saveProject } from '@/lib/dataRepo';
import { Project } from '@/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get('clientId');
  const creatorId = searchParams.get('creatorId');

  let list = await getProjects();
  if (clientId) {
    list = list.filter((p) => p.clientId === clientId);
  }
  if (creatorId) {
    list = list.filter((p) => p.creatorId === creatorId);
  }

  return NextResponse.json({ success: true, count: list.length, data: list });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientId, clientName, creatorId, creatorName, creatorAvatar, title, description, budget, deadline } = body;

    if (!title || !budget) {
      return NextResponse.json({ success: false, error: 'Title and budget are required.' }, { status: 400 });
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      clientId: clientId || 'client-me',
      clientName: clientName || 'Client',
      creatorId: creatorId || 'creator-1',
      creatorName: creatorName || 'Elena Rostova',
      creatorAvatar: creatorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      title,
      description: description || 'Custom project brief',
      budget: Number(budget),
      status: 'PENDING',
      deadline: deadline || '5 days',
      progress: 10,
      createdAt: 'Just now',
    };

    const saved = await saveProject(newProject);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
