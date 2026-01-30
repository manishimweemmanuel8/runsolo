export type { User, Session, Account } from '@/lib/db/schema/users';
export type { Client, NewClient } from '@/lib/db/schema/clients';
export type { Job, NewJob } from '@/lib/db/schema/jobs';
export type { Task, NewTask } from '@/lib/db/schema/tasks';
export type { TimeEntry, NewTimeEntry } from '@/lib/db/schema/time-entries';
export type {
  Invoice,
  NewInvoice,
  InvoiceLineItem,
} from '@/lib/db/schema/invoices';
export type { Payment, NewPayment } from '@/lib/db/schema/payments';
export type {
  AuditLog,
  NewAuditLog,
  AuditMetadata,
} from '@/lib/db/schema/audit-logs';

export type UserRole = 'user' | 'admin';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
