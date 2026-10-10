import { NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/apiResponse';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    conversationId: 'conv-1',
    senderId: 'user-creator-1',
    senderName: 'Elena Rostova',
    content: 'Hi Aarav! I reviewed the smartphone commercial brief. Runway Gen-3 camera sweeps look incredible with the titanium model.',
    time: '10:30 AM',
    read: true,
    createdAt: '10:30 AM',
  },
  {
    id: 'm2',
    conversationId: 'conv-1',
    senderId: 'user-client-1',
    senderName: 'Me',
    content: 'That sounds amazing Elena! Can we make sure the neon reflection matches cyan and electric purple palette?',
    time: '10:32 AM',
    read: true,
    createdAt: '10:32 AM',
  },
  {
    id: 'm3',
    conversationId: 'conv-1',
    senderId: 'user-creator-1',
    senderName: 'Elena Rostova',
    content: 'Got it! Incorporating those notes into the latest generative batch.',
    time: '10:35 AM',
    read: false,
    createdAt: '10:35 AM',
  }
];

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return apiSuccess(INITIAL_MESSAGES);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const msg = {
    id: `m-${Date.now()}`,
    conversationId: id,
    senderId: body.senderId || 'user-client-1',
    senderName: body.senderName || 'Me',
    content: body.content,
    time: 'Just now',
    attachment: body.attachment,
    read: true,
    createdAt: 'Just now',
  };

  INITIAL_MESSAGES.push(msg);
  return apiSuccess(msg, 'Message sent', 201);
}
