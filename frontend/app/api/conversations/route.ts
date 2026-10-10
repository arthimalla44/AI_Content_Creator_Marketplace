import { NextResponse } from 'next/server';
import { DEMO_CREATORS } from '@/lib/mockData';
import { apiSuccess } from '@/lib/apiResponse';

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    participantId: 'user-creator-1',
    participantName: 'Elena Rostova',
    participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    participantRole: 'CREATOR',
    lastMessage: 'Got it! Incorporating those notes into the latest generative batch.',
    updatedAt: '10:35 AM',
    unreadCount: 1,
  },
  {
    id: 'conv-2',
    participantId: 'user-creator-2',
    participantName: 'Zack Chen',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    participantRole: 'CREATOR',
    lastMessage: 'The 4K product photoshoots are rendered with zero background halo.',
    updatedAt: 'Yesterday',
    unreadCount: 0,
  }
];

export async function GET() {
  return apiSuccess(INITIAL_CONVERSATIONS);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newConv = {
    id: `conv-${Date.now()}`,
    participantId: body.participantId || 'user-creator-1',
    participantName: body.participantName || 'Elena Rostova',
    participantAvatar: body.participantAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    participantRole: body.participantRole || 'CREATOR',
    lastMessage: body.lastMessage || 'Conversation started',
    updatedAt: 'Just now',
    unreadCount: 0,
  };
  INITIAL_CONVERSATIONS.unshift(newConv);
  return apiSuccess(newConv, 'Conversation created successfully', 201);
}
