import { pgTable, text, timestamp, uuid, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { user } from './users';
import { clients } from './clients';

export const jobStatusEnum = pgEnum('job_status', [
  'draft',
  'active',
  'completed',
  'cancelled',
]);

export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').references(() => clients.id, {
    onDelete: 'set null',
  }),
  title: text('title').notNull(),
  description: text('description'),
  status: jobStatusEnum('status').notNull().default('draft'),
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
  fixedPrice: decimal('fixed_price', { precision: 10, scale: 2 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
