import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CreatorHub AI Database Seed on Supabase PostgreSQL...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Core Users (Admin, Client, Creators)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@creatorhub.ai' },
    update: {},
    create: {
      name: 'System Administrator',
      email: 'admin@creatorhub.ai',
      passwordHash,
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      bio: 'CreatorHub AI Operations & Security Administrator',
      location: 'Bangalore, India',
      verified: true,
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: 'client@creatorhub.ai' },
    update: {},
    create: {
      name: 'Aarav Mehta',
      email: 'client@creatorhub.ai',
      passwordHash,
      role: 'CLIENT',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Brand Lead at Nexa D2C Brands',
      location: 'Mumbai, India',
      verified: true,
    },
  });

  const creatorUser1 = await prisma.user.upsert({
    where: { email: 'elena@creatorhub.ai' },
    update: {},
    create: {
      name: 'Elena Rostova',
      email: 'elena@creatorhub.ai',
      passwordHash,
      role: 'CREATOR',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Visual director & prompt artist. 5+ years commercial cinematography, 2+ years Runway Gen-3/Luma.',
      location: 'Berlin, Germany',
      skills: ['Runway Gen-3', 'Midjourney', 'Topaz Video AI', 'Sound Design'],
      hourlyRate: 65,
      verified: true,
      creatorProfile: {
        create: {
          headline: 'Cinematic AI Ads & Hyper-Realistic Product Cinematography',
          description: 'Specializing in prompt-to-video for global brands, cosmetics, and auto showcases.',
          category: 'AI Video Creators',
          experience: 'Expert (4+ yrs)',
          responseTime: '< 1 hour',
          completionRate: 99.4,
          rating: 4.97,
          reviewCount: 48,
          totalProjects: 62,
          totalEarnings: 34500,
          aiSpecialties: ['Prompt-to-Video Direction', 'Camera Physics Emulation', 'Neural Upscaling'],
          tools: ['Runway Gen-3', 'Luma Dream Machine', 'Kling AI', 'Midjourney v6.1'],
        },
      },
    },
    include: { creatorProfile: true },
  });

  const creatorUser2 = await prisma.user.upsert({
    where: { email: 'zack@creatorhub.ai' },
    update: {},
    create: {
      name: 'Zack Chen',
      email: 'zack@creatorhub.ai',
      passwordHash,
      role: 'CREATOR',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'Product rendering specialist using custom Flux.1 LoRAs and ComfyUI workflows for e-commerce brands.',
      location: 'Singapore',
      skills: ['Flux.1 Pro', 'ComfyUI', 'Midjourney', 'LoRA Training'],
      hourlyRate: 50,
      verified: true,
      creatorProfile: {
        create: {
          headline: 'High-End E-Commerce Product Staging & Photorealistic Visuals',
          description: 'Creating lifestyle and studio product renders without renting physical studio space.',
          category: 'AI Image Creators',
          experience: 'Senior (3 yrs)',
          responseTime: '< 2 hours',
          completionRate: 98.8,
          rating: 4.92,
          reviewCount: 39,
          totalProjects: 51,
          totalEarnings: 27800,
          aiSpecialties: ['E-Commerce Product Staging', 'Custom LoRA Training', 'Multi-Angle Consistency'],
          tools: ['Flux.1 Pro', 'Midjourney', 'ComfyUI', 'Photoshop AI'],
        },
      },
    },
    include: { creatorProfile: true },
  });

  console.log(`✅ Seeded Core Users: Admin (${adminUser.email}), Client (${clientUser.email}), Creators (${creatorUser1.email}, ${creatorUser2.email})`);

  // 2. Services
  if (creatorUser1.creatorProfile) {
    await prisma.service.upsert({
      where: { id: 'service-1' },
      update: {},
      create: {
        id: 'service-1',
        creatorId: creatorUser1.creatorProfile.id,
        title: 'Cinematic 30s 4K AI Product Advertisement with Sound Design',
        description: 'Transform your brand or physical product into a breathtaking video ad using Runway Gen-3.',
        category: 'AI Video Creators',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        deliveryDays: 3,
        basicPrice: 3500,
        standardPrice: 5500,
        premiumPrice: 9500,
        revisions: 3,
        features: ['4K Ultra HD Export', 'Script & Concept Design', 'Sound FX & Voiceover', 'Commercial Rights Included'],
        tags: ['Runway Gen-3', 'Commercial', '4K Video', 'Product Ad'],
      },
    });
  }

  // 3. Workflows
  if (creatorUser2.creatorProfile) {
    await prisma.workflow.upsert({
      where: { id: 'wf-1' },
      update: {},
      create: {
        id: 'wf-1',
        creatorId: creatorUser2.creatorProfile.id,
        title: 'ComfyUI + Flux.1 E-Commerce Product Studio',
        description: 'Automated high-res background replacement and lighting integration node pipeline for commercial catalog photography.',
        category: 'Product Photography',
        price: 1999,
        tools: ['Flux.1 Pro', 'ComfyUI', 'Photoshop AI'],
        inputs: ['Raw product packshot on white backdrop'],
        outputs: ['4K photorealistic lifestyle staging render with shadows'],
        license: 'Commercial Unlimited',
        purchasesCount: 48,
        rating: 4.95,
      },
    });
  }

  // 4. Prompt Listings
  await prisma.promptListing.upsert({
    where: { id: 'pr-1' },
    update: {},
    create: {
      id: 'pr-1',
      title: 'Photorealistic Luxury Automotive Commercial Shots',
      description: 'Precision Midjourney v6 prompt formula yielding wet asphalt reflections, anamorphic lens flares, and aerodynamic kinematics.',
      category: '3D CGI / Vehicles',
      model: 'Midjourney v6.1',
      price: 499,
      exampleOutput: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      creatorName: 'Elena Rostova',
      creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      license: 'Commercial Non-Exclusive',
      tags: ['Automotive', 'Midjourney', 'Cinematic'],
    },
  });

  // 5. Sample Project & Milestone
  await prisma.project.upsert({
    where: { id: 'proj-demo-1' },
    update: {},
    create: {
      id: 'proj-demo-1',
      clientId: clientUser.id,
      creatorId: creatorUser1.id,
      title: 'Electric SUV Global Brand Reveal Commercial',
      description: '30-second broadcast-ready generative spot featuring mountain switchback curves and photorealistic wet reflections.',
      budget: 5000,
      status: 'IN_PROGRESS',
      progress: 65,
      milestones: {
        create: [
          { title: 'Moodboard & Visual Concept Deck', amount: 1500, status: 'COMPLETED' },
          { title: 'Raw 4K Runway Gen-3 Cuts', amount: 2000, status: 'IN_PROGRESS' },
          { title: 'Sound Design & Final Color Grade', amount: 1500, status: 'PENDING' },
        ],
      },
    },
  });

  // 6. Sample Saved AI Studio Content
  await prisma.savedAIContent.upsert({
    where: { id: 'ai-saved-demo-1' },
    update: {},
    create: {
      id: 'ai-saved-demo-1',
      userId: clientUser.id,
      toolType: 'viral-scripts',
      topic: 'Launch teaser for Next-Gen Smart Ring',
      output: 'HOOK (0-3s): Stop wearing bulky tech on your wrist. This titanium ring tracks your vitals without distracting screens.',
    },
  });

  console.log('✨ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
