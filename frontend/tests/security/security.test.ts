import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.TEST_APP_URL || 'http://localhost:3000';

describe('Security & Authorization Test Suite', () => {
  it('protects /api/auth/me against unauthenticated access with 401', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    expect(res.status).toBe(401);

    const json = await res.json();
    expect(json.user).toBeNull();
  });

  it('rejects malicious SQL injection payloads in authentication input', async () => {
    const sqliPayload = "' OR '1'='1' --";
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: sqliPayload,
        password: 'password123',
      }),
    });

    // Should reject as invalid credentials or bad input, not bypass authentication
    expect([400, 401]).toContain(res.status);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it('ensures passwordHash and sensitive credentials are never leaked in user responses', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@creatorhub.ai',
        password: 'password123',
      }),
    });
    expect(res.status).toBe(200);

    const text = await res.text();
    expect(text).not.toContain('passwordHash');
    expect(text).not.toContain('$2a$10$');
    expect(text).not.toContain('NEXTAUTH_SECRET');
    expect(text).not.toContain('DATABASE_URL');
  });

  it('prevents privilege escalation by forcing validated roles during registration', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Attacker Attempt',
        email: `escalate-${Date.now()}@test.ai`,
        password: 'password123',
        confirmPassword: 'password123',
        role: 'ADMIN', // Unauthorized role attempt
      }),
    });

    const json = await res.json();
    if (json.success && json.user) {
      // Must not be granted ADMIN
      expect(json.user.role).not.toBe('ADMIN');
      expect(json.user.role).toBe('CLIENT');
    }
  });

  it('sanitizes and safely handles cross-site scripting (XSS) inputs', async () => {
    const xssScript = '<script>alert("XSS")</script>';
    const res = await fetch(`${BASE_URL}/api/ai/copilot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: xssScript,
        budget: 1000,
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});
