import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.TEST_APP_URL || 'http://localhost:3000';

describe('Integration Test: Live Backend Route Handlers & Data APIs', () => {
  let sessionCookie = '';

  it('1. GET /api/creators returns creator directory with active ratings', async () => {
    const res = await fetch(`${BASE_URL}/api/creators`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);
    expect(json.data[0].name).toBeDefined();
    expect(json.data[0].category).toBeDefined();
  });

  it('2. GET /api/services returns services with transparent pricing & deliverables', async () => {
    const res = await fetch(`${BASE_URL}/api/services`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);
    expect(json.data[0].basicPrice).toBeGreaterThan(0);
    expect(json.data[0].thumbnail).toBeDefined();
  });

  it('3. GET /api/prompts returns prompt marketplace listings', async () => {
    const res = await fetch(`${BASE_URL}/api/prompts`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);
    expect(json.data[0].model).toBeDefined();
  });

  it('4. GET /api/workflows returns AI workflow listings', async () => {
    const res = await fetch(`${BASE_URL}/api/workflows`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);
  });

  it('5. POST /api/ai/copilot decomposes project requirements into tools & matching', async () => {
    const res = await fetch(`${BASE_URL}/api/ai/copilot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Luxury perfume commercial 4K Runway Gen-3',
        budget: 4500,
      }),
    });
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.creatorMatches.length).toBeGreaterThan(0);
  });

  it('6. POST /api/auth/register rejects duplicate registration with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Admin',
        email: 'admin@creatorhub.ai',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'CLIENT',
      }),
    });
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('already exists');
  });

  it('7. POST /api/auth/login rejects invalid password with 401', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@creatorhub.ai',
        password: 'wrong_password_attempt',
      }),
    });
    expect(res.status).toBe(401);

    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it('8. POST /api/auth/login authenticates seeded admin and issues session cookie', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@creatorhub.ai',
        password: 'password123',
      }),
    });
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.user.email).toBe('admin@creatorhub.ai');

    const cookieHeader = res.headers.get('set-cookie');
    expect(cookieHeader).toContain('creatorhub_token');
    if (cookieHeader) {
      sessionCookie = cookieHeader.split(';')[0];
    }
  });

  it('9. GET /api/auth/me resolves current authenticated user using session cookie', async () => {
    expect(sessionCookie).toBeTruthy();
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: sessionCookie,
      },
    });
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.user).not.toBeNull();
    expect(json.user.email).toBe('admin@creatorhub.ai');
    expect(json.user.role).toBe('ADMIN');
  });

  it('10. POST and GET /api/ai/saved saves generative output and retrieves history', async () => {
    const testTopic = `Live API Test AI Generation ${Date.now()}`;
    const createRes = await fetch(`${BASE_URL}/api/ai/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'admin@creatorhub.ai',
        toolType: 'viral-scripts',
        topic: testTopic,
        output: 'Scene 1: High tech synthesizer macro shot.',
      }),
    });
    expect(createRes.status).toBe(200);
    const createJson = await createRes.json();
    expect(createJson.success).toBe(true);
    expect(createJson.data.topic).toBe(testTopic);

    // Retrieve saved
    const getRes = await fetch(`${BASE_URL}/api/ai/saved?userId=admin@creatorhub.ai`);
    expect(getRes.status).toBe(200);
    const getJson = await getRes.json();
    expect(getJson.success).toBe(true);
    expect(Array.isArray(getJson.data)).toBe(true);
    const match = getJson.data.find((item: any) => item.topic === testTopic);
    expect(match).toBeDefined();
  });

  it('11. POST /api/reviews saves a new review and rejects duplicate submission', async () => {
    const timestamp = Date.now();
    const projectId = `proj-rev-test-${timestamp}`;
    const reviewerId = `client-${timestamp}`;

    const createRes = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        reviewerId,
        reviewerName: 'Verified Live Client',
        creatorId: 'creator-1',
        rating: 5,
        comment: 'Flawless communication and exceptional 4K video quality.',
      }),
    });
    expect(createRes.status).toBe(200);
    const createJson = await createRes.json();
    expect(createJson.success).toBe(true);
    expect(createJson.data.rating).toBe(5);

    // Attempt duplicate review on same project by same reviewer
    const dupRes = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        reviewerId,
        creatorId: 'creator-1',
        rating: 5,
        comment: 'Trying duplicate review submission.',
      }),
    });
    expect(dupRes.status).toBe(400);
    const dupJson = await dupRes.json();
    expect(dupJson.success).toBe(false);
    expect(dupJson.error).toContain('already reviewed');
  });

  it('12. GET /api/dashboard/admin aggregates real system statistics', async () => {
    const res = await fetch(`${BASE_URL}/api/dashboard/admin`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.data.stats).toBeDefined();
    expect(json.data.stats.totalRegisteredUsers).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(json.data.users)).toBe(true);
  });

  it('13. POST /api/auth/logout clears session cookie, invalidates token and /api/auth/me returns 401', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Cookie: sessionCookie,
      },
    });
    expect(res.status).toBe(200);

    const cookieHeader = res.headers.get('set-cookie');
    expect(cookieHeader).toContain('creatorhub_token=;');

    // Verify previously valid token is now rejected as invalidated
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: sessionCookie,
      },
    });
    expect(meRes.status).toBe(401);
  });

  it('14. POST /api/auth/forgot-password and /api/auth/reset-password executes secure single-use token flow', async () => {
    // 1. Request reset token
    const forgotRes = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@creatorhub.ai' }),
    });
    expect(forgotRes.status).toBe(200);
    const forgotJson = await forgotRes.json();
    expect(forgotJson.success).toBe(true);
    expect(forgotJson.resetToken).toBeDefined();

    const resetToken = forgotJson.resetToken;

    // 2. Consume reset token to change password
    const resetRes = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: resetToken,
        newPassword: 'password123',
        confirmPassword: 'password123',
      }),
    });
    expect(resetRes.status).toBe(200);
    const resetJson = await resetRes.json();
    expect(resetJson.success).toBe(true);

    // 3. Verify single-use token cannot be reused
    const reuseRes = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: resetToken,
        newPassword: 'anotherpassword123',
        confirmPassword: 'anotherpassword123',
      }),
    });
    expect(reuseRes.status).toBe(400);
    const reuseJson = await reuseRes.json();
    expect(reuseJson.success).toBe(false);
  });
});
