import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

const DEMO_REPORTS = [
  {
    id: 'rep-1',
    reporter: 'Aarav Mehta',
    target: 'Suspicious Bot Studio',
    reason: 'Spam service posting with duplicate low-res content',
    status: 'PENDING',
    createdAt: 'Yesterday',
  },
  {
    id: 'rep-2',
    reporter: 'Elena Rostova',
    target: 'Unverified Client account',
    reason: 'Off-platform payment solicitation request',
    status: 'RESOLVED',
    createdAt: '3 days ago',
  }
];

export async function GET() {
  return apiSuccess(DEMO_REPORTS);
}

export async function POST(req: Request) {
  const body = await req.json();
  const report = {
    id: `rep-${Date.now()}`,
    ...body,
    status: 'PENDING',
    createdAt: 'Just now',
  };
  DEMO_REPORTS.unshift(report);
  return apiSuccess(report, 'Report submitted for review', 201);
}
