import { NextResponse } from 'next/server';
import { createUser, generateToken } from '@/lib/userRepo';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword, role } = body;

    // Strict validation
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: 'Email address is required.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, error: 'Passwords do not match.' }, { status: 400 });
    }
    const validRoles = ['CLIENT', 'CREATOR'];
    const chosenRole = validRoles.includes(role) ? role : 'CLIENT';

    const newUser = await createUser({
      name,
      email,
      password,
      role: chosenRole,
    });

    const token = generateToken(newUser);

    const response = NextResponse.json({
      success: true,
      user: newUser,
      message: 'Account created successfully.',
    });

    // Set secure HTTP-only cookie
    response.cookies.set('creatorhub_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Server error during registration.' }, { status: 400 });
  }
}
