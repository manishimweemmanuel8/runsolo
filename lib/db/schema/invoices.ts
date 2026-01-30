import {
  pgTable,
  text,
  timestamp,
  uuid,
  decimal,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core';
import { user } from './users';
import { clients } from './clients';
import { jobs } from './jobs';

export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled',
]);

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').references(() => clients.id, {
    onDelete: 'set null',
  }),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'set null' }),
  invoiceNumber: text('invoice_number').notNull(),
  status: invoiceStatusEnum('status').notNull().default('draft'),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  lineItems: jsonb('line_items').$type<InvoiceLineItem[]>(),
  notes: text('notes'),
  dueDate: timestamp('due_date'),
  sentAt: timestamp('sent_at'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
