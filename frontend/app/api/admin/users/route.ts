import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/userRepo';
import { apiSuccess } from '@/lib/apiResponse';

export async function GET() {
  const users = await getAllUsers();
  return apiSuccess(users.map(({ passwordHash, ...safe }) => safe));
}
