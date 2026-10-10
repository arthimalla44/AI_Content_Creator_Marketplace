import { NextResponse } from 'next/server';
import { AIService } from '@/lib/aiService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toolType, topic, platform, tone } = body;

    const result = await AIService.generateStudioOutput({
      toolType: toolType || 'video_script',
      topic: topic || 'AI Launch',
      platform,
      tone,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
