import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, findUserById, updateUserAvatar } from '@/lib/userRepo';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('creatorhub_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { avatar } = body;

    if (!avatar || typeof avatar !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid avatar image is required.' }, { status: 400 });
    }

    // Optional: Limit base64 image size to ~5MB
    if (avatar.length > 7 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'Image size exceeds maximum allowed limit (5MB).' }, { status: 400 });
    }

    const success = await updateUserAvatar(payload.id, avatar);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Failed to update avatar image.' }, { status: 500 });
    }

    const updatedUser = await findUserById(payload.id);
    const { passwordHash: _, ...safeUser } = updatedUser || ({} as any);

    return NextResponse.json({
      success: true,
      user: safeUser,
      message: 'Profile photo updated successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}
