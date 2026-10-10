import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

const DEMO_DISPUTES = [
  {
    id: 'disp-1',
    projectId: 'proj-1',
    initiator: 'Aarav Mehta',
    respondent: 'Elena Rostova',
    reason: 'Revision delivery timeline alignment',
    amount: 5000,
    status: 'IN_MEDIATION',
    createdAt: '2 days ago',
  }
];

export async function GET() {
  return apiSuccess(DEMO_DISPUTES);
}

export async function POST(req: Request) {
  const body = await req.json();
  const dispute = {
    id: `disp-${Date.now()}`,
    ...body,
    status: 'OPEN',
    createdAt: 'Just now',
  };
  DEMO_DISPUTES.unshift(dispute);
  return apiSuccess(dispute, 'Dispute ticket registered', 201);
}
