import { NextResponse } from 'next/server';
import { AIService } from '@/lib/aiService';
import { apiSuccess, handleApiError } from '@/lib/apiResponse';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, platform, tone } = body;

    const copy = await AIService.generateStudioOutput({
      toolType: 'ad_copy',
      topic: topic || 'Direct response advertisement',
      platform,
      tone,
    });

    return apiSuccess({ adCopy: copy });
  } catch (error: any) {
    return handleApiError(error);
  }
}
