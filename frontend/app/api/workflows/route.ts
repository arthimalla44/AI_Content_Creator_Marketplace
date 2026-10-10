import { NextResponse } from 'next/server';
import { getWorkflows } from '@/lib/dataRepo';

export async function GET() {
  const workflows = await getWorkflows();
  return NextResponse.json({ success: true, count: workflows.length, data: workflows });
}
