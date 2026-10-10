import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/dataRepo';
import { DEMO_CREATORS } from '@/lib/mockData';
import { apiSuccess } from '@/lib/apiResponse';

export async function GET() {
  const creator = DEMO_CREATORS[0];
  const projects = await getProjects();
  const activeOrders = projects.filter((p) => p.creatorName === creator.name);

  return apiSuccess({
    creator,
    stats: {
      totalEarnings: creator.totalEarnings * 82,
      totalProjects: creator.totalProjects,
      rating: creator.rating,
      reviewCount: creator.reviewCount,
      completionRate: creator.completionRate,
      activePipelines: activeOrders.length,
    },
    activeOrders,
    copilotSuggestions: [
      { id: 's1', title: 'Add Kling AI to your toolstack', reason: 'Search volume +42% this week' },
      { id: 's2', title: 'Optimize Service Thumbnail', reason: 'High-contrast 4K lighting increases CTR ~18%' },
    ],
  });
}
