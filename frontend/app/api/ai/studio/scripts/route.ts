import { NextResponse } from 'next/server';
import { AIService } from '@/lib/aiService';
import { apiSuccess, handleApiError } from '@/lib/apiResponse';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, platform, tone } = body;

    const script = await AIService.generateStudioOutput({
      toolType: 'video_script',
      topic: topic || 'High impact brand video',
      platform: platform || 'Reels / TikTok',
      tone: tone || 'Cinematic',
    });

    return apiSuccess({ script });
  } catch (error: any) {
    return handleApiError(error);
  }
}
