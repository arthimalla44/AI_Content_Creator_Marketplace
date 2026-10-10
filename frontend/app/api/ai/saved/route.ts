import { NextResponse } from 'next/server';
import { getSavedGenerations, saveAIGeneration, SavedAIGeneration } from '@/lib/dataRepo';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'all';
  const list = await getSavedGenerations(userId);
  return NextResponse.json({ success: true, count: list.length, data: list });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, toolType, topic, output } = body;

    if (!topic || !output) {
      return NextResponse.json({ success: false, error: 'Topic and output are required.' }, { status: 400 });
    }

    const item: SavedAIGeneration = {
      id: `gen-${Date.now()}`,
      userId: userId || 'anonymous',
      toolType: toolType || 'custom',
      topic,
      output,
      createdAt: 'Just now',
    };

    const saved = await saveAIGeneration(item);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
