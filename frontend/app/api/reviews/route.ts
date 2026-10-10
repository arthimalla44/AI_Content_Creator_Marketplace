import { NextResponse } from 'next/server';
import { getReviews, saveReview } from '@/lib/dataRepo';
import { Review } from '@/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const creatorId = searchParams.get('creatorId');

  let reviews = await getReviews();
  if (creatorId) {
    reviews = reviews.filter((r) => r.creatorId === creatorId);
  }
  return NextResponse.json({ success: true, count: reviews.length, data: reviews });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, reviewerId, reviewerName, reviewerAvatar, creatorId, rating, categories, comment } = body;

    if (!projectId || !creatorId || !rating || !comment) {
      return NextResponse.json({ success: false, error: 'Missing required review fields.' }, { status: 400 });
    }

    // Prevent duplicate review for the same project
    const all = await getReviews();
    const existing = all.find((r) => r.projectId === projectId && r.reviewerId === reviewerId);
    if (existing) {
      return NextResponse.json({ success: false, error: 'You have already reviewed this project.' }, { status: 400 });
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      projectId,
      reviewerId: reviewerId || 'client-me',
      reviewerName: reviewerName || 'Verified Client',
      reviewerAvatar: reviewerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      creatorId,
      rating: Number(rating),
      categories: categories || {
        quality: 5,
        communication: 5,
        timeliness: 5,
        creativity: 5,
      },
      comment,
      createdAt: 'Just now',
    };

    const saved = await saveReview(newReview);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
