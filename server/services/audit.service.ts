import { db } from '@/lib/db';
import { auditLogs } from '@/lib/db/schema/audit-logs';
import { user } from '@/lib/db/schema/users';
import { eq, desc, and, gte, lte, sql } from 'drizzle-orm';

interface GetAuditLogsParams {
  userId?: string;
  entity?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export async function getAuditLogs(params: GetAuditLogsParams) {
  const {
    userId,
    entity,
    action,
    startDate,
    endDate,
    page = 1,
    limit = 50,
  } = params;

  const conditions = [];

  if (userId) {
    conditions.push(eq(auditLogs.userId, userId));
  }
  if (entity) {
    conditions.push(eq(auditLogs.entity, entity as typeof auditLogs.entity.enumValues[number]));
  }
  if (action) {
    conditions.push(eq(auditLogs.action, action as typeof auditLogs.action.enumValues[number]));
  }
  if (startDate) {
    conditions.push(gte(auditLogs.createdAt, startDate));
  }
  if (endDate) {
    conditions.push(lte(auditLogs.createdAt, endDate));
  }

  const offset = (page - 1) * limit;

  const [logs, countResult] = await Promise.all([
    db
      .select({
        id: auditLogs.id,
        userId: auditLogs.userId,
        userName: user.name,
        userEmail: user.email,
        action: auditLogs.action,
        entity: auditLogs.entity,
        entityId: auditLogs.entityId,
        oldValue: auditLogs.oldValue,
        newValue: auditLogs.newValue,
        metadata: auditLogs.metadata,
        ipAddress: auditLogs.ipAddress,
        userAgent: auditLogs.userAgent,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .leftJoin(user, eq(auditLogs.userId, user.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(auditLogs)
      .where(conditions.length > 0 ? and(...conditions) : undefined),
  ]);

  return {
    logs,
    total: Number(countResult[0].count),
    page,
    limit,
    totalPages: Math.ceil(Number(countResult[0].count) / limit),
  };
}

export async function getAuditLogById(id: string) {
  const result = await db
    .select({
      id: auditLogs.id,
      userId: auditLogs.userId,
      userName: user.name,
      userEmail: user.email,
      action: auditLogs.action,
      entity: auditLogs.entity,
      entityId: auditLogs.entityId,
      oldValue: auditLogs.oldValue,
      newValue: auditLogs.newValue,
      metadata: auditLogs.metadata,
      ipAddress: auditLogs.ipAddress,
      userAgent: auditLogs.userAgent,
      createdAt: auditLogs.createdAt,
    })
    .from(auditLogs)
    .leftJoin(user, eq(auditLogs.userId, user.id))
    .where(eq(auditLogs.id, id))
    .limit(1);

  return result[0] ?? null;
}
