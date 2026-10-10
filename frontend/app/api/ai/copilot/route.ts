import { NextResponse } from 'next/server';
import { AIService } from '@/lib/aiService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, budget, deadline } = body;

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
    }

    const result = await AIService.runProjectCopilot({
      prompt,
      budget,
      deadline,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
