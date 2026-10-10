import { NextResponse } from 'next/server';
import { getJobs, saveJob } from '@/lib/dataRepo';
import { JobPost } from '@/types';

export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json({ success: true, count: jobs.length, data: jobs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, budget, category, skills, preferredTools, deadline, clientName, clientAvatar } = body;

    if (!title || !budget) {
      return NextResponse.json({ success: false, error: 'Title and budget are required.' }, { status: 400 });
    }

    const newJob: JobPost = {
      id: `job-${Date.now()}`,
      clientId: 'client-me',
      clientName: clientName || 'Client',
      clientAvatar: clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      title,
      description: description || '',
      budget: Number(budget),
      category: category || 'AI Video Creators',
      skills: skills || ['AI Prompting'],
      preferredTools: preferredTools || ['Runway Gen-3', 'Midjourney'],
      deadline: deadline || '4 days',
      status: 'OPEN',
      applicationsCount: 0,
      createdAt: 'Just now',
    };

    const saved = await saveJob(newJob);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
