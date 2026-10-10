import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/userRepo';
import { DEMO_CREATORS } from '@/lib/mockData';
import { getProjects } from '@/lib/dataRepo';
import { apiSuccess } from '@/lib/apiResponse';

export async function GET() {
  const users = await getAllUsers();
  const projects = await getProjects();

  return apiSuccess({
    stats: {
      totalRegisteredUsers: users.length,
      verifiedCreatorsCount: DEMO_CREATORS.filter((c) => c.verified).length,
      escrowVolume: projects.reduce((acc, p) => acc + p.budget, 0),
      openReportsCount: 1,
    },
    users: users.map(({ passwordHash, ...safe }) => safe),
    creators: DEMO_CREATORS,
  });
}
