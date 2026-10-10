/**
 * Configurable AI Provider Adapter
 * Supports OpenAI API format and server-side configuration
 * Strictly maintains API keys on server-side without exposure to client bundles.
 */

export interface AIProviderConfig {
  provider: 'openai' | 'local' | 'anthropic';
  apiKey?: string;
  apiBaseUrl?: string;
  model?: string;
  timeoutMs?: number;
  allowFallback: boolean;
}

export interface AIGenerationResult {
  output: string;
  providerUsed: 'openai' | 'anthropic' | 'local_fallback';
  isFallback: boolean;
  model: string;
  latencyMs: number;
}

export class AIProviderAdapter {
  private static getConfig(): AIProviderConfig {
    const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
    const providerEnv = (process.env.AI_PROVIDER || (apiKey ? 'openai' : 'local')).toLowerCase();
    const provider = providerEnv === 'openai' || providerEnv === 'anthropic' ? providerEnv : 'local';
    const allowFallback = process.env.AI_ALLOW_FALLBACK !== 'false'; // default true
    const apiBaseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.OPENAI_MODEL || (provider === 'openai' ? 'gpt-4o-mini' : 'local-heuristic-v1');
    const timeoutMs = Number(process.env.AI_TIMEOUT_MS) || 12000;

    return {
      provider,
      apiKey,
      apiBaseUrl,
      model,
      timeoutMs,
      allowFallback,
    };
  }

  /**
   * Generates text via configured provider or falls back when permitted.
   */
  static async generateText(
    prompt: string,
    systemPrompt: string = 'You are an expert AI content creator and creative strategist for CreatorHub AI.',
    fallbackGenerator?: () => Promise<string> | string
  ): Promise<AIGenerationResult> {
    const config = this.getConfig();
    const startTime = Date.now();

    // 1. If configured for OpenAI and API key is present
    if (config.provider === 'openai' && config.apiKey && config.apiKey.trim() !== '') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs);

        const response = await fetch(`${config.apiBaseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: config.model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 1500,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          throw new Error(`OpenAI Provider HTTP ${response.status}: ${errText.slice(0, 200)}`);
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content?.trim();

        if (!content || content.length < 5) {
          throw new Error('OpenAI returned empty or invalid response');
        }

        return {
          output: content,
          providerUsed: 'openai',
          isFallback: false,
          model: config.model || 'gpt-4o-mini',
          latencyMs: Date.now() - startTime,
        };
      } catch (err: any) {
        console.warn(`[AIProviderAdapter] Live provider call failed: ${err.message}`);
        if (!config.allowFallback) {
          throw new Error(`AI Provider generation failed and fallback is disabled: ${err.message}`);
        }
      }
    } else if (config.provider !== 'local' && !config.apiKey && !config.allowFallback) {
      throw new Error(`AI Provider '${config.provider}' is configured but missing API key, and fallback is disabled.`);
    }

    // 2. Local Fallback Generator
    const fallbackOutput = fallbackGenerator ? await fallbackGenerator() : 'Generated content preview via local engine.';
    return {
      output: fallbackOutput,
      providerUsed: 'local_fallback',
      isFallback: true,
      model: 'local-heuristic-v1',
      latencyMs: Date.now() - startTime,
    };
  }
}
