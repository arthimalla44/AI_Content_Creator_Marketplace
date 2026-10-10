import { NextResponse } from 'next/server';
import { AIService } from '@/lib/aiService';
import { apiSuccess, handleApiError } from '@/lib/apiResponse';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic } = body;

    const remix = await AIService.generateStudioOutput({
      toolType: 'remix_multi',
      topic: topic || 'Core brand concept',
    });

    return apiSuccess({ remix });
  } catch (error: any) {
    return handleApiError(error);
  }
}
