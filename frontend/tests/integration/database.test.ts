import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/prisma';

describe('Integration Test: Live Supabase PostgreSQL Connection, CRUD, Relations & Rollbacks', () => {
  const timestamp = Date.now();
  const clientEmail = `qa-client-${timestamp}@creatorhub-test.ai`;
  const creatorEmail = `qa-creator-${timestamp}@creatorhub-test.ai`;
  let clientId: string = '';
  let creatorId: string = '';
  let creatorProfileId: string = '';
  let projectId: string = '';

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    // Isolated Cleanup: delete created test records in reverse-dependency order
    if (projectId) {
      await prisma.project.delete({ where: { id: projectId } }).catch(() => {});
    }
    if (creatorId) {
      await prisma.user.delete({ where: { id: creatorId } }).catch(() => {});
    }
    if (clientId) {
      await prisma.user.delete({ where: { id: clientId } }).catch(() => {});
    }
    await prisma.$disconnect();
  });

  it('1. Connects to live Supabase PostgreSQL and queries system tables', async () => {
    const count = await prisma.user.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('2. Creates and persists a client user with unique email constraint', async () => {
    const client = await prisma.user.create({
      data: {
        name: 'QA Audit Client',
        email: clientEmail,
        passwordHash: '$2a$10$hashedpasswordsample1234567890',
        role: 'CLIENT',
        bio: 'Automated live testing client profile',
      },
    });

    expect(client.id).toBeDefined();
    expect(client.email).toBe(clientEmail);
    clientId = client.id;

    // Verify duplicate email constraint is rejected by PostgreSQL
    await expect(
      prisma.user.create({
        data: {
          name: 'Duplicate Client',
          email: clientEmail,
          passwordHash: '$2a$10$hashedpasswordsample1234567890',
        },
      })
    ).rejects.toThrow();
  });

  it('3. Creates a creator user with nested CreatorProfile relation', async () => {
    const creator = await prisma.user.create({
      data: {
        name: 'QA Audit Creator',
        email: creatorEmail,
        passwordHash: '$2a$10$hashedpasswordsample1234567890',
        role: 'CREATOR',
        bio: 'Specialist in generative 3D & AI media',
        creatorProfile: {
          create: {
            headline: 'Senior AI Motion Director',
            description: 'Runway Gen-3 and ComfyUI expert.',
            category: 'AI Video Creators',
            experience: 'Senior',
            responseTime: '< 1 hour',
            completionRate: 100.0,
            rating: 5.0,
            reviewCount: 0,
            totalProjects: 0,
            totalEarnings: 0,
            aiSpecialties: ['3D CGI', 'Neural NeRF'],
            tools: ['Runway Gen-3', 'Luma Dream Machine'],
          },
        },
      },
      include: {
        creatorProfile: true,
      },
    });

    expect(creator.id).toBeDefined();
    expect(creator.creatorProfile).not.toBeNull();
    expect(creator.creatorProfile?.headline).toBe('Senior AI Motion Director');
    creatorId = creator.id;
    creatorProfileId = creator.creatorProfile!.id;
  });

  it('4. Creates Project referencing Client and Creator and updates state', async () => {
    expect(clientId).toBeTruthy();
    expect(creatorId).toBeTruthy();

    const proj = await prisma.project.create({
      data: {
        id: `proj-qa-${timestamp}`,
        clientId: clientId,
        creatorId: creatorId,
        title: 'Live 4K Hologram Product Shoot',
        description: 'Generative prompt-directed commercial pipeline in Supabase.',
        budget: 6500,
        status: 'PENDING',
        progress: 15,
      },
    });

    expect(proj.id).toBe(`proj-qa-${timestamp}`);
    expect(proj.budget).toBe(6500);
    expect(proj.status).toBe('PENDING');
    projectId = proj.id;

    // Update project state to IN_PROGRESS and progress to 60
    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'IN_PROGRESS',
        progress: 60,
      },
    });
    expect(updated.status).toBe('IN_PROGRESS');
    expect(updated.progress).toBe(60);
  });

  it('5. Persists AI Content Studio generation tied to the created client', async () => {
    expect(clientId).toBeTruthy();

    const saved = await prisma.savedAIContent.create({
      data: {
        userId: clientId,
        toolType: 'viral-scripts',
        topic: 'AI Drone Commercial',
        output: 'Visual: High altitude panoramic sweep of mountain terrain.',
      },
    });

    expect(saved.id).toBeDefined();
    expect(saved.userId).toBe(clientId);

    // Retrieve from Supabase database
    const retrieved = await prisma.savedAIContent.findFirst({
      where: { userId: clientId },
    });
    expect(retrieved?.topic).toBe('AI Drone Commercial');
  });

  it('6. Verifies database transaction rollback on intentional operation failure', async () => {
    const rollbackEmail = `rollback-${timestamp}@creatorhub-test.ai`;

    try {
      await prisma.$transaction(async (tx) => {
        await tx.user.create({
          data: {
            name: 'Rollback Candidate',
            email: rollbackEmail,
            passwordHash: 'secret_hash',
            role: 'CLIENT',
          },
        });
        throw new Error('Intentional transaction error to force rollback');
      });
    } catch (err: any) {
      expect(err.message).toContain('Intentional transaction error');
    }

    // Verify record does NOT exist in PostgreSQL
    const checkUser = await prisma.user.findUnique({
      where: { email: rollbackEmail },
    });
    expect(checkUser).toBeNull();
  });

  it('7. Enforces foreign key cascading deletion on user teardown', async () => {
    expect(clientId).toBeTruthy();

    // Delete project first to satisfy foreign keys
    if (projectId) {
      await prisma.project.delete({ where: { id: projectId } });
      projectId = '';
    }

    // Delete client user
    await prisma.user.delete({ where: { id: clientId } });

    // Confirm cascaded saved content was cleaned up
    const orphanedContent = await prisma.savedAIContent.findFirst({
      where: { userId: clientId },
    });
    expect(orphanedContent).toBeNull();
    clientId = ''; // Marked as cleaned
  });
});
