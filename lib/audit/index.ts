import { db } from '@/lib/db';
import {
  auditLogs,
  type NewAuditLog,
  type AuditMetadata,
} from '@/lib/db/schema/audit-logs';
import { headers } from 'next/headers';
import { nanoid } from 'nanoid';

type AuditAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'login'
  | 'logout'
  | 'login_failed'
  | 'password_reset'
  | 'email_verified'
  | 'export'
  | 'import';

type AuditEntity =
  | 'user'
  | 'client'
  | 'job'
  | 'task'
  | 'time_entry'
  | 'invoice'
  | 'payment'
  | 'session';

interface CreateAuditLogParams {
  userId?: string | null;
  action: AuditAction;
  entity: AuditEntity;
  entityId?: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  metadata?: AuditMetadata;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(
  params: CreateAuditLogParams
): Promise<void> {
  const headersList = await headers();

  const auditEntry: NewAuditLog = {
    userId: params.userId ?? null,
    action: params.action,
    entity: params.entity,
    entityId: params.entityId,
    oldValue: params.oldValue,
    newValue: params.newValue,
    metadata: {
      requestId: nanoid(),
      ...params.metadata,
    },
    ipAddress:
      params.ipAddress ?? headersList.get('x-forwarded-for') ?? undefined,
    userAgent: params.userAgent ?? headersList.get('user-agent') ?? undefined,
  };

  try {
    await db.insert(auditLogs).values(auditEntry);
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}

export function sanitizeForAudit<T extends Record<string, unknown>>(
  data: T
): Record<string, unknown> {
  const sensitiveFields = ['password', 'accessToken', 'refreshToken', 'idToken'];
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (sensitiveFields.includes(key)) {
      sanitized[key] = '[REDACTED]';
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeForAudit(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
