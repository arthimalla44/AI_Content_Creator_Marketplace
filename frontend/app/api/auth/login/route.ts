import { NextResponse } from 'next/server';
import { findUserByEmail, verifyUserPassword, generateToken } from '@/lib/userRepo';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
    }

    const isMatch = await verifyUserPassword(user, password);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
    }

    const { passwordHash: _, ...safeUser } = user;
    const token = generateToken(safeUser);

    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: 'Logged in successfully.',
    });

    response.cookies.set('creatorhub_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    return response;
  } catch (error: any) {
    console.error('[login error]:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Internal server error.' }, { status: 500 });
  }
}
