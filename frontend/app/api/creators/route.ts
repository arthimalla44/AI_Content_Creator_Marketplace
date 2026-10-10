import { NextResponse } from 'next/server';
import { DEMO_CREATORS } from '@/lib/mockData';
import { prisma } from '@/lib/prisma';
import { CreatorProfile } from '@/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let results: CreatorProfile[] = DEMO_CREATORS;

  try {
    const dbCreators = await prisma.creatorProfile.findMany({
      include: {
        user: true,
      },
    });

    if (dbCreators && dbCreators.length > 0) {
      results = dbCreators.map((cp) => ({
        id: cp.id,
        userId: cp.userId,
        username: cp.user.name.toLowerCase().replace(/\s+/g, ''),
        name: cp.user.name,
        avatar: cp.user.avatar || '',
        headline: cp.headline,
        description: cp.description,
        category: cp.category,
        experience: cp.experience,
        responseTime: cp.responseTime,
        completionRate: cp.completionRate,
        rating: cp.rating,
        reviewCount: cp.reviewCount,
        totalProjects: cp.totalProjects,
        totalEarnings: cp.totalEarnings,
        startingPrice: 2000,
        aiSpecialties: cp.aiSpecialties,
        tools: cp.tools,
        online: true,
        verified: cp.user.verified,
      }));
    }
  } catch (error) {
    console.warn('[creators] Database query failed, using demo creators:', error);
  }

  if (category && category !== 'All') {
    results = results.filter((c) => c.category === category);
  }

  if (search) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.headline.toLowerCase().includes(search.toLowerCase()) ||
        c.tools.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
  }

  return NextResponse.json({ success: true, count: results.length, data: results });
}
