import { pgTable, text, timestamp, uuid, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { user } from './users';
import { invoices } from './invoices';

export const paymentMethodEnum = pgEnum('payment_method', [
  'cash',
  'bank_transfer',
  'card',
  'other',
]);

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  invoiceId: uuid('invoice_id').references(() => invoices.id, {
    onDelete: 'set null',
  }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  method: paymentMethodEnum('method'),
  reference: text('reference'),
  notes: text('notes'),
  paidAt: timestamp('paid_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
