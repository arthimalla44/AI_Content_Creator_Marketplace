import { NextResponse } from 'next/server';
import { verifyAndConsumeResetToken, resetUserPassword } from '@/lib/userRepo';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, newPassword, confirmPassword } = body;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Reset token is required.' }, { status: 400 });
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      console.warn('[reset-password] Passwords do not match');
      return NextResponse.json({ success: false, error: 'Passwords do not match.' }, { status: 400 });
    }

    const email = verifyAndConsumeResetToken(token);
    if (!email) {
      console.warn('[reset-password] Token invalid or expired:', token);
      return NextResponse.json({ success: false, error: 'Password reset token is invalid, expired, or has already been used.' }, { status: 400 });
    }

    const success = await resetUserPassword(email, newPassword);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Failed to update user password.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Your password has been successfully reset. Please log in with your new password.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
