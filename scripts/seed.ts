import { config } from 'dotenv';

config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { user } from '../lib/db/schema/users';
import { nanoid } from 'nanoid';

async function seed() {
  console.log('Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error('Error: ADMIN_EMAIL is not set in .env.local');
    console.log('Please add ADMIN_EMAIL=your-email@example.com to your .env.local file');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  // Create admin user
  const adminId = nanoid();
  await db.insert(user).values({
    id: adminId,
    name: 'Admin',
    email: adminEmail,
    emailVerified: true,
    role: 'admin',
  });

  console.log(`Created admin user: ${adminEmail}`);
  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
