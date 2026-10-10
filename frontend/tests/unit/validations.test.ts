import { describe, it, expect } from 'vitest';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ProjectCreateSchema,
  JobCreateSchema,
  ReviewCreateSchema,
  AICopilotSchema,
  AIStudioSchema
} from '@/lib/validations';

describe('Unit Test: Zod Validation Schemas', () => {
  it('validates correct user registration input', () => {
    const valid = RegisterSchema.safeParse({
      name: 'Test Creator',
      email: 'creator@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'CREATOR',
    });
    expect(valid.success).toBe(true);
  });

  it('rejects mismatched password and confirmPassword', () => {
    const invalid = RegisterSchema.safeParse({
      name: 'Test Creator',
      email: 'creator@example.com',
      password: 'password123',
      confirmPassword: 'different123',
      role: 'CREATOR',
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects invalid email formats', () => {
    const invalid = LoginSchema.safeParse({
      email: 'invalid-email-string',
      password: 'password123',
    });
    expect(invalid.success).toBe(false);
  });

  it('validates project creation constraints (positive budget, min length)', () => {
    const valid = ProjectCreateSchema.safeParse({
      creatorId: 'creator-1',
      title: 'Cinematic 4K Commercial Shoot',
      description: 'Comprehensive product video production brief with Runway Gen-3.',
      budget: 3500,
    });
    expect(valid.success).toBe(true);

    const negativeBudget = ProjectCreateSchema.safeParse({
      creatorId: 'creator-1',
      title: 'Cinematic 4K Shoot',
      description: 'Comprehensive product video production brief with Runway Gen-3.',
      budget: -500,
    });
    expect(negativeBudget.success).toBe(false);
  });

  it('validates review rating range 1 to 5', () => {
    const validReview = ReviewCreateSchema.safeParse({
      projectId: 'proj-1',
      reviewerId: 'client-1',
      creatorId: 'creator-1',
      rating: 5,
      comment: 'Outstanding visual quality and fast delivery!',
    });
    expect(validReview.success).toBe(true);

    const outOfBoundsReview = ReviewCreateSchema.safeParse({
      projectId: 'proj-1',
      reviewerId: 'client-1',
      creatorId: 'creator-1',
      rating: 6,
      comment: 'Invalid rating',
    });
    expect(outOfBoundsReview.success).toBe(false);
  });

  it('validates AI Studio toolType and topic required fields', () => {
    const validAI = AIStudioSchema.safeParse({
      toolType: 'viral-scripts',
      topic: 'Smart fitness tracker promotion',
    });
    expect(validAI.success).toBe(true);

    const missingTopic = AIStudioSchema.safeParse({
      toolType: 'viral-scripts',
      topic: '',
    });
    expect(missingTopic.success).toBe(false);
  });
});
