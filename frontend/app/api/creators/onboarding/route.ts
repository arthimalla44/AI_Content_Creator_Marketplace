import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

export async function POST(req: Request) {
  const body = await req.json();
  return apiSuccess(
    {
      onboarded: true,
      profile: body,
    },
    'Onboarding completed successfully'
  );
}
