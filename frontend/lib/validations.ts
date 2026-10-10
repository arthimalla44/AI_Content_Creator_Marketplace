import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6),
  role: z.enum(['CLIENT', 'CREATOR']).default('CLIENT'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const ProjectCreateSchema = z.object({
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  creatorId: z.string().min(1, 'Creator is required'),
  creatorName: z.string().optional(),
  creatorAvatar: z.string().optional(),
  title: z.string().min(3, 'Project title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  budget: z.number().positive('Budget must be greater than 0'),
  deadline: z.string().optional(),
});

export const JobCreateSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  budget: z.number().positive('Budget must be positive'),
  category: z.string().default('AI Video Creators'),
  skills: z.array(z.string()).default([]),
  preferredTools: z.array(z.string()).default([]),
  deadline: z.string().default('4 days'),
});

export const ReviewCreateSchema = z.object({
  projectId: z.string().min(1),
  reviewerId: z.string().min(1),
  reviewerName: z.string().optional(),
  reviewerAvatar: z.string().optional(),
  creatorId: z.string().min(1),
  rating: z.number().min(1).max(5),
  categories: z.object({
    quality: z.number().min(1).max(5),
    communication: z.number().min(1).max(5),
    timeliness: z.number().min(1).max(5),
    creativity: z.number().min(1).max(5),
  }).optional(),
  comment: z.string().min(5, 'Review comment must be at least 5 characters'),
});

export const AICopilotSchema = z.object({
  prompt: z.string().min(3, 'Prompt is required'),
  budget: z.number().optional(),
  deadline: z.string().optional(),
  category: z.string().optional(),
});

export const AIStudioSchema = z.object({
  toolType: z.string().min(1),
  topic: z.string().min(2, 'Topic is required'),
  targetAudience: z.string().optional(),
  platform: z.string().optional(),
  tone: z.string().optional(),
});
