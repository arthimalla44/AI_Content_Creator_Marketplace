import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AIService } from '@/lib/aiService';
import { AIProviderAdapter } from '@/lib/aiAdapter';

describe('Unit Test: AI Copilot & Content Studio Logic', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('1. Decomposes client briefs and matches suitable creators with scoring', async () => {
    const result = await AIService.runProjectCopilot({
      prompt: '30-second AI product advertisement for new smartphone launch',
      budget: 5000,
      deadline: '5 days',
    });

    expect(result.estimatedBudget).toBe(5000);
    expect(result.creatorMatches.length).toBeGreaterThan(0);
    expect(result.creatorMatches[0].matchScore).toBeGreaterThan(70);
    expect(result.recommendedTools.length).toBeGreaterThan(0);
  });

  it('2. Generates structured studio content for viral scripts via adapter', async () => {
    const output = await AIService.generateStudioOutput({
      toolType: 'social_post',
      topic: 'Cyberpunk Sneaker Launch',
      platform: 'TikTok',
      tone: 'High-Energy',
    });

    expect(output).toBeDefined();
    expect(output.length).toBeGreaterThan(20);
    expect(output).toContain('AI Content');
  });

  it('3. Generates ad copy, hooks, and content remixing', async () => {
    const adCopy = await AIService.generateStudioOutput({
      toolType: 'ad_copy',
      topic: 'Obsidian Smart Ring',
    });
    expect(adCopy).toContain('Headline');

    const remix = await AIService.generateStudioOutput({
      toolType: 'remix_multi',
      topic: 'Next-Gen Autonomous Workflow',
    });
    expect(remix).toContain('REMIX');
  });

  it('4. Analyzes content quality and returns dimensional metrics', async () => {
    const analysis = await AIService.analyzeContentQuality(
      'Introducing the worlds first AI powered content creation studio. Build faster. Tap the link to shop today!'
    );

    expect(analysis.score).toBeGreaterThan(50);
    expect(analysis.metrics.clarity).toBeGreaterThan(0);
    expect(analysis.metrics.engagement).toBeGreaterThan(0);
    expect(analysis.metrics.ctaQuality).toBeGreaterThan(70);
  });

  it('5. AIProviderAdapter handles missing credentials and flags fallback gracefully', async () => {
    delete process.env.OPENAI_API_KEY;
    process.env.AI_PROVIDER = 'local';

    const res = await AIProviderAdapter.generateText('Test Prompt', 'System', async () => 'Heuristic fallback content');
    expect(res.isFallback).toBe(true);
    expect(res.providerUsed).toBe('local_fallback');
    expect(res.output).toBe('Heuristic fallback content');
  });

  it('6. AIProviderAdapter rejects when fallback is disabled and provider fails', async () => {
    process.env.AI_PROVIDER = 'openai';
    process.env.AI_ALLOW_FALLBACK = 'false';
    delete process.env.OPENAI_API_KEY;

    await expect(
      AIProviderAdapter.generateText('Test Prompt', 'System', async () => 'Should not be called')
    ).rejects.toThrow(/missing API key/i);
  });

  it('7. AIProviderAdapter connects to live/mocked OpenAI HTTP API and returns real output', async () => {
    process.env.OPENAI_API_KEY = 'sk-mock-test-key-12345';
    process.env.AI_PROVIDER = 'openai';

    // Mock global fetch for OpenAI response validation
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: '🎬 REAL AI SCRIPT GENERATED VIA OPENAI API: Experience ultra-clarity with neural rendering.',
            },
          },
        ],
      }),
    } as any);

    const res = await AIProviderAdapter.generateText('Commercial Script Brief', 'Creative Director');
    expect(res.isFallback).toBe(false);
    expect(res.providerUsed).toBe('openai');
    expect(res.output).toContain('REAL AI SCRIPT GENERATED VIA OPENAI API');
    expect(mockFetch).toHaveBeenCalled();
  });
});
