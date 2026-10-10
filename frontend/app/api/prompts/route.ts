import { NextResponse } from 'next/server';
import { getPrompts } from '@/lib/dataRepo';

export async function GET() {
  const prompts = await getPrompts();
  return NextResponse.json({ success: true, count: prompts.length, data: prompts });
}
