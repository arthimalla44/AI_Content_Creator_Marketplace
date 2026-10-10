import { NextResponse } from 'next/server';
import { DEMO_SERVICES } from '@/lib/mockData';
import { prisma } from '@/lib/prisma';
import { Service } from '@/types';

export async function GET(req: Request) {
  let list: Service[] = DEMO_SERVICES;

  try {
    const dbServices = await prisma.service.findMany({
      include: {
        creator: {
          include: { user: true },
        },
      },
    });

    if (dbServices && dbServices.length > 0) {
      list = dbServices.map((s) => ({
        id: s.id,
        creatorId: s.creatorId,
        creatorName: s.creator.user.name,
        creatorAvatar: s.creator.user.avatar || '',
        title: s.title,
        description: s.description,
        category: s.category,
        thumbnail: s.thumbnail,
        videoUrl: s.videoUrl ?? undefined,
        deliveryDays: s.deliveryDays,
        basicPrice: s.basicPrice,
        standardPrice: s.standardPrice,
        premiumPrice: s.premiumPrice,
        revisions: s.revisions,
        features: s.features,
        tags: s.tags,
        rating: 4.95,
        reviewsCount: 30,
        tools: ['AI Tools'],
      }));
    }
  } catch (error) {
    console.warn('[services] Database query failed, using demo services:', error);
  }

  return NextResponse.json({ success: true, count: list.length, data: list });
}
