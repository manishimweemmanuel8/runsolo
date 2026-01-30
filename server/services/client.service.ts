import { db } from '@/lib/db';
import { clients, type Client, type NewClient } from '@/lib/db/schema/clients';
import { eq, and, desc, sql } from 'drizzle-orm';

export async function getClientsByUserId(
  userId: string,
  options: { page?: number; limit?: number } = {}
): Promise<{ clients: Client[]; total: number }> {
  const { page = 1, limit = 20 } = options;
  const offset = (page - 1) * limit;

  const [clientList, countResult] = await Promise.all([
    db
      .select()
      .from(clients)
      .where(eq(clients.userId, userId))
      .orderBy(desc(clients.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(clients)
      .where(eq(clients.userId, userId)),
  ]);

  return {
    clients: clientList,
    total: Number(countResult[0].count),
  };
}

export async function getClientById(
  id: string,
  userId: string
): Promise<Client | null> {
  const result = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, id), eq(clients.userId, userId)))
    .limit(1);

  return result[0] ?? null;
}

export async function createClient(data: NewClient): Promise<Client> {
  const result = await db.insert(clients).values(data).returning();
  return result[0];
}

export async function updateClient(
  id: string,
  userId: string,
  data: Partial<Omit<NewClient, 'id' | 'userId'>>
): Promise<Client | null> {
  const result = await db
    .update(clients)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(clients.id, id), eq(clients.userId, userId)))
    .returning();

  return result[0] ?? null;
}

export async function deleteClient(
  id: string,
  userId: string
): Promise<boolean> {
  const result = await db
    .delete(clients)
    .where(and(eq(clients.id, id), eq(clients.userId, userId)))
    .returning({ id: clients.id });

  return result.length > 0;
}
