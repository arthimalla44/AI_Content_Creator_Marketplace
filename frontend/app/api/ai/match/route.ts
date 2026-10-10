import { NextResponse } from 'next/server';
import { DEMO_CREATORS } from '@/lib/mockData';
import { apiSuccess, handleApiError } from '@/lib/apiResponse';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brief, budget, deadline, skills, tools } = body;

    const briefText = (brief || '').toLowerCase();

    const matches = DEMO_CREATORS.map((creator) => {
      let score = 75;
      const reasons: string[] = [];

      // Check tool hits
      const toolHits = creator.tools.filter((t) =>
        briefText.includes(t.toLowerCase()) || (tools && tools.includes(t))
      );
      if (toolHits.length > 0) {
        score += 15;
        reasons.push(`Mastery in requested tools: ${toolHits.join(', ')}`);
      }

      // Check budget
      if (budget && creator.startingPrice <= budget) {
        score += 10;
        reasons.push(`Starting rate (₹${creator.startingPrice}) fits project budget`);
      }

      // Check ratings
      if (creator.rating >= 4.9) {
        reasons.push(`High client satisfaction rating (${creator.rating}/5.0)`);
      }

      const matchScore = Math.min(99, score);

      return {
        creatorId: creator.id,
        creatorName: creator.name,
        username: creator.username,
        avatar: creator.avatar,
        category: creator.category,
        matchScore,
        reasons,
        warnings: budget && creator.startingPrice > budget ? ['Starting price exceeds stated budget'] : [],
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    return apiSuccess({
      briefAnalysis: {
        analyzedBrief: brief,
        budget: budget || 5000,
        deadline: deadline || '7 days',
      },
      recommendations: matches,
    });
  } catch (error: any) {
    return handleApiError(error);
  }
}
