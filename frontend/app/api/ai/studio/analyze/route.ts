import { NextResponse } from 'next/server';
import { AIService } from '@/lib/aiService';
import { apiSuccess, handleApiError } from '@/lib/apiResponse';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

    const analysis = await AIService.analyzeContentQuality(content || '');
    return apiSuccess(analysis);
  } catch (error: any) {
    return handleApiError(error);
  }
}
