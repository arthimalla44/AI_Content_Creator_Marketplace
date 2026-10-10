import { prisma } from './lib/prisma';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ DATABASE_CONNECTION_SUCCESSFUL: Connected to Supabase PostgreSQL!');
    const userCount = await prisma.user.count();
    console.log('📊 Current User Count in Database:', userCount);
  } catch (error: any) {
    console.log('❌ DATABASE_CONNECTION_REQUIRES_PASSWORD:');
    console.log(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
