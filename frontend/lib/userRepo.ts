import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Role } from '@/types';
import { DEMO_USERS } from '@/lib/mockData';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'creatorhub-ai-secure-jwt-secret-hackathon-2026';

export interface StoredUser extends User {
  passwordHash: string;
}

// In-memory fallback if database is not reachable yet
let inMemoryUsers: StoredUser[] = DEMO_USERS.map((u) => ({
  ...u,
  passwordHash: bcrypt.hashSync('password123', 10),
}));

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: { creatorProfile: true },
    });
    if (dbUser) {
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role as Role,
        avatar: dbUser.avatar || '',
        bio: dbUser.bio || '',
        location: dbUser.location || '',
        skills: dbUser.skills || [],
        hourlyRate: dbUser.hourlyRate ?? undefined,
        availability: dbUser.availability || 'Available',
        verified: dbUser.verified,
        passwordHash: dbUser.passwordHash,
      };
    }
  } catch (error) {
    console.warn('[userRepo] Database query failed, falling back to local store:', error);
  }

  // Fallback
  return inMemoryUsers.find((u) => u.email.toLowerCase() === cleanEmail) || null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id },
      include: { creatorProfile: true },
    });
    if (dbUser) {
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role as Role,
        avatar: dbUser.avatar || '',
        bio: dbUser.bio || '',
        location: dbUser.location || '',
        skills: dbUser.skills || [],
        hourlyRate: dbUser.hourlyRate ?? undefined,
        availability: dbUser.availability || 'Available',
        verified: dbUser.verified,
        passwordHash: dbUser.passwordHash,
      };
    }
  } catch (error) {
    console.warn('[userRepo] Database query failed, falling back to local store:', error);
  }

  return inMemoryUsers.find((u) => u.id === id) || null;
}

export async function getAllUsers(): Promise<StoredUser[]> {
  try {
    const dbUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (dbUsers && dbUsers.length > 0) {
      return dbUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role as Role,
        avatar: u.avatar || '',
        bio: u.bio || '',
        location: u.location || '',
        skills: u.skills || [],
        hourlyRate: u.hourlyRate ?? undefined,
        availability: u.availability || 'Available',
        verified: u.verified,
        passwordHash: u.passwordHash,
      }));
    }
  } catch (error) {
    console.warn('[userRepo] Database query failed, falling back to local store:', error);
  }

  return inMemoryUsers;
}

export async function createUser(params: {
  name: string;
  email: string;
  password: string;
  role: Role;
}): Promise<User> {
  const cleanEmail = params.email.trim().toLowerCase();
  const existing = await findUserByEmail(cleanEmail);
  if (existing) {
    throw new Error('An account with this email already exists.');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(params.password, salt);

  const avatar =
    params.role === 'CREATOR'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
  const bio = params.role === 'CREATOR' ? 'AI Content Creator & Specialist' : 'Client & Creative Producer';
  const skills = params.role === 'CREATOR' ? ['AI Prompting', 'Content Creation'] : ['Project Management'];

  try {
    const created = await prisma.user.create({
      data: {
        name: params.name.trim(),
        email: cleanEmail,
        passwordHash,
        role: params.role as any,
        avatar,
        bio,
        location: 'Remote',
        skills,
        hourlyRate: params.role === 'CREATOR' ? 50 : null,
        availability: 'Available',
        verified: false,
        ...(params.role === 'CREATOR'
          ? {
              creatorProfile: {
                create: {
                  headline: 'AI Content Specialist & Prompt Engineer',
                  description: 'Specializing in next-gen AI video, imagery, and copywriting workflows.',
                  category: 'AI Video Creators',
                  experience: 'Intermediate',
                  responseTime: '< 2 hours',
                  completionRate: 99.0,
                  rating: 5.0,
                  reviewCount: 0,
                  totalProjects: 0,
                  totalEarnings: 0,
                  aiSpecialties: ['Prompt Engineering', 'Generative Media'],
                  tools: ['Midjourney', 'Runway Gen-3', 'Claude 3.5'],
                },
              },
            }
          : {}),
      },
    });

    return {
      id: created.id,
      name: created.name,
      email: created.email,
      role: created.role as Role,
      avatar: created.avatar || '',
      bio: created.bio || '',
      location: created.location || '',
      skills: created.skills || [],
      hourlyRate: created.hourlyRate ?? undefined,
      availability: created.availability || 'Available',
      verified: created.verified,
    };
  } catch (error) {
    console.warn('[userRepo] Database user creation failed, saving to memory fallback:', error);
  }

  // Fallback
  const newUser: StoredUser = {
    id: `user-${Date.now()}`,
    name: params.name.trim(),
    email: cleanEmail,
    role: params.role,
    avatar,
    bio,
    location: 'Remote',
    skills,
    hourlyRate: params.role === 'CREATOR' ? 50 : undefined,
    availability: 'Available',
    verified: false,
    passwordHash,
  };

  inMemoryUsers.push(newUser);
  const { passwordHash: _, ...safeUser } = newUser;
  return safeUser;
}

export async function verifyUserPassword(storedUser: StoredUser, passwordAttempt: string): Promise<boolean> {
  return bcrypt.compare(passwordAttempt, storedUser.passwordHash);
}

export async function updateUserAvatar(userId: string, avatar: string): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { avatar },
    });
    return true;
  } catch (error) {
    console.warn('[userRepo] Database avatar update failed, updating memory fallback:', error);
  }

  const index = inMemoryUsers.findIndex((u) => u.id === userId);
  if (index !== -1) {
    inMemoryUsers[index].avatar = avatar;
    return true;
  }
  return false;
}

export async function resetUserPassword(email: string, newPassword: string): Promise<boolean> {
  const cleanEmail = email.trim().toLowerCase();
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  try {
    await prisma.user.update({
      where: { email: cleanEmail },
      data: { passwordHash },
    });
    return true;
  } catch (error) {
    console.warn('[userRepo] Database password update failed, updating memory fallback:', error);
  }

  const index = inMemoryUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);
  if (index === -1) {
    return false;
  }
  inMemoryUsers[index].passwordHash = passwordHash;
  return true;
}

// Revocation tracking for logged-out / invalidated tokens
const revokedTokens = new Set<string>();

// Expiring, single-use password reset tokens: Map<token, { email: string, expiresAt: number, used: boolean }>
interface ResetTokenRecord {
  email: string;
  expiresAt: number;
  used: boolean;
}
const resetTokens = new Map<string, ResetTokenRecord>();

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      jti: `token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function invalidateToken(token: string): void {
  if (token) {
    revokedTokens.add(token);
    try {
      const decoded: any = jwt.decode(token);
      if (decoded && decoded.jti) {
        revokedTokens.add(decoded.jti);
      }
    } catch {
      // ignore
    }
  }
}

export function verifyToken(token: string): any {
  try {
    if (!token || revokedTokens.has(token)) {
      return null;
    }
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (decoded && decoded.jti && revokedTokens.has(decoded.jti)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function createPasswordResetToken(email: string): string {
  const cleanEmail = email.trim().toLowerCase();
  const token = `reset-${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;
  // Token expires in 15 minutes (single-use)
  resetTokens.set(token, {
    email: cleanEmail,
    expiresAt: Date.now() + 15 * 60 * 1000,
    used: false,
  });
  return token;
}

export function verifyAndConsumeResetToken(token: string): string | null {
  const record = resetTokens.get(token);
  if (!record) return null;
  if (record.used || Date.now() > record.expiresAt) {
    resetTokens.delete(token);
    return null;
  }
  record.used = true;
  resetTokens.delete(token);
  return record.email;
}

