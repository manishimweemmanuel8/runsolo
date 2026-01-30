'use server';

import { requireAdmin } from '@/app/proxy';
import * as auditService from '@/server/services/audit.service';

interface GetAuditLogsInput {
  userId?: string;
  entity?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export async function getAuditLogs(input: GetAuditLogsInput = {}) {
  await requireAdmin();

  const { startDate, endDate, ...rest } = input;

  return auditService.getAuditLogs({
    ...rest,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
  });
}

export async function getAuditLogById(id: string) {
  await requireAdmin();

  return auditService.getAuditLogById(id);
}
