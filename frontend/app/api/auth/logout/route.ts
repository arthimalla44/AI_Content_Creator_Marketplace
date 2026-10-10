import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { invalidateToken } from '@/lib/userRepo';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('creatorhub_token')?.value;
  if (token) {
    invalidateToken(token);
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.set('creatorhub_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
  return response;
}
