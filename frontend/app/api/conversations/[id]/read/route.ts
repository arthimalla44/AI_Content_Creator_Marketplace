import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

export async function PATCH() {
  return apiSuccess({ read: true }, 'Messages marked as read');
}
