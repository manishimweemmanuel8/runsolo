import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';
import { user } from './users';

export const auditActionEnum = pgEnum('audit_action', [
  'create',
  'read',
  'update',
  'delete',
  'login',
  'logout',
  'login_failed',
  'password_reset',
  'email_verified',
  'export',
  'import',
]);

export const auditEntityEnum = pgEnum('audit_entity', [
  'user',
  'client',
  'job',
  'task',
  'time_entry',
  'invoice',
  'payment',
  'session',
]);

export interface AuditMetadata {
  requestId?: string;
  sessionId?: string;
  path?: string;
  method?: string;
  [key: string]: unknown;
}

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
    action: auditActionEnum('action').notNull(),
    entity: auditEntityEnum('entity').notNull(),
    entityId: text('entity_id'),
    oldValue: jsonb('old_value'),
    newValue: jsonb('new_value'),
    metadata: jsonb('metadata').$type<AuditMetadata>(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    index('audit_logs_user_id_idx').on(table.userId),
    index('audit_logs_entity_idx').on(table.entity),
    index('audit_logs_action_idx').on(table.action),
    index('audit_logs_created_at_idx').on(table.createdAt),
  ]
);

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
