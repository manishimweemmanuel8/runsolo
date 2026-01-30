import { db } from '@/lib/db';
import { user } from '@/lib/db/schema/users';
import { eq } from 'drizzle-orm';

export async function getUserById(id: string) {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function updateUserProfile(
  id: string,
  data: { name?: string; image?: string | null }
) {
  const result = await db
    .update(user)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(user.id, id))
    .returning();

  return result[0] ?? null;
}
