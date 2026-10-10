import { NextResponse } from 'next/server';
import { findUserByEmail, createPasswordResetToken } from '@/lib/userRepo';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, newPassword, confirmPassword } = body;

    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: 'Email address is required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(cleanEmail);

    // If newPassword and confirmPassword are provided, perform direct reset
    if (newPassword !== undefined || confirmPassword !== undefined) {
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'Password must be at least 6 characters long.' },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { success: false, error: 'Passwords do not match.' },
          { status: 400 }
        );
      }

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'No account found with this email address.' },
          { status: 404 }
        );
      }

      const { resetUserPassword } = await import('@/lib/userRepo');
      const updated = await resetUserPassword(cleanEmail, newPassword);
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Failed to update user password.' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Your password has been successfully updated! You can now sign in.',
      });
    }

    if (!user) {
      // Security: return generic response to avoid user enumeration
      return NextResponse.json({
        success: true,
        message: 'If an account exists with that email address, password reset instructions have been dispatched.',
      });
    }

    const resetToken = createPasswordResetToken(cleanEmail);

    return NextResponse.json({
      success: true,
      message: 'Password reset instructions have been generated.',
      // Provide reset token for development and testing environments (simulated email dispatch)
      resetToken,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Failed to process password reset request.' }, { status: 500 });
  }
}
