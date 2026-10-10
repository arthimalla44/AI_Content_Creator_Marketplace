import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/dataRepo';
import { DEMO_CREATORS } from '@/lib/mockData';
import { apiSuccess } from '@/lib/apiResponse';

export async function GET() {
  const projects = await getProjects();
  const activeProjects = projects.filter((p) => p.status !== 'COMPLETED');
  const completedProjects = projects.filter((p) => p.status === 'COMPLETED');
  const totalVolume = projects.reduce((acc, p) => acc + p.budget, 0);

  return apiSuccess({
    stats: {
      activeProjectsCount: activeProjects.length,
      completedProjectsCount: completedProjects.length,
      totalVolume,
      escrowProtectedPercentage: 100,
    },
    activeProjects,
    recentRecommendations: DEMO_CREATORS.slice(0, 3),
  });
}
