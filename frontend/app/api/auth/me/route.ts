import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, findUserById } from '@/lib/userRepo';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('creatorhub_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const user = await findUserById(payload.id);
    if (!user) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const { passwordHash: _, ...safeUser } = user;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Session check failed' }, { status: 500 });
  }
}
