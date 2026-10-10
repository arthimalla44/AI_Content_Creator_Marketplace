import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
};

export function apiSuccess<T>(data: T, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message ? { message } : {}),
    },
    { status }
  );
}

export function apiError(message: string, code: string = 'BAD_REQUEST', status: number = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    { status }
  );
}

export function handleApiError(error: any) {
  console.error('API Error:', error);
  if (error instanceof ZodError) {
    return apiError(
      error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', '),
      'VALIDATION_ERROR',
      422,
      error.issues
    );
  }
  return apiError(error.message || 'Internal Server Error', 'SERVER_ERROR', 500);
}
