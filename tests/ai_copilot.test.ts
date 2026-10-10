import { describe, it, expect } from 'vitest';
import { AIService } from '../frontend/lib/aiService';

describe('AI Copilot & Studio Test Suite', () => {
  it('should decompose client brief and recommend matched creators', async () => {
    const result = await AIService.runProjectCopilot({
      prompt: '30-second AI product advertisement for new smartphone launch',
      budget: 5000,
      deadline: '5 days'
    });

    expect(result.estimatedBudget).toBe(5000);
    expect(result.creatorMatches.length).toBeGreaterThan(0);
    expect(result.creatorMatches[0].matchScore).toBeGreaterThan(80);
    expect(result.recommendedTools).toContain('Runway Gen-3 Alpha');
  });

  it('should analyze content quality and compute scoring dimensions', async () => {
    const analysis = await AIService.analyzeContentQuality(
      'Introducing the world first AI smartphone. Order now to receive exclusive access.'
    );

    expect(analysis.score).toBeGreaterThan(50);
    expect(analysis.metrics.clarity).toBeDefined();
    expect(analysis.metrics.engagement).toBeDefined();
  });
});
