import { NextResponse } from 'next/server';
import { AIService } from '@/lib/aiService';
import { apiSuccess, handleApiError } from '@/lib/apiResponse';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, platform, tone } = body;

    const hooks = await AIService.generateStudioOutput({
      toolType: 'social_post',
      topic: topic || 'Viral social media hooks',
      platform,
      tone,
    });

    return apiSuccess({ hooks });
  } catch (error: any) {
    return handleApiError(error);
  }
}
