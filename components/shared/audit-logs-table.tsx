'use client';

import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

interface AuditLog {
  id: string;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  ipAddress: string | null;
  createdAt: Date;
}

interface AuditLogsTableProps {
  logs: AuditLog[];
  isLoading?: boolean;
  emptyMessage?: string;
}

function getActionBadgeVariant(action: string) {
  switch (action) {
    case 'create':
      return 'default';
    case 'update':
      return 'secondary';
    case 'delete':
      return 'destructive';
    case 'login':
    case 'logout':
      return 'outline';
    default:
      return 'secondary';
  }
}

export function AuditLogsTable({
  logs,
  isLoading = false,
  emptyMessage = 'No audit logs found',
}: AuditLogsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Entity ID</TableHead>
          <TableHead>IP Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="whitespace-nowrap">
              {format(new Date(log.createdAt), 'MMM d, yyyy HH:mm:ss')}
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{log.userName ?? 'System'}</p>
                <p className="text-xs text-muted-foreground">{log.userEmail}</p>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={getActionBadgeVariant(log.action)}>
                {log.action}
              </Badge>
            </TableCell>
            <TableCell className="capitalize">{log.entity}</TableCell>
            <TableCell className="font-mono text-xs">
              {log.entityId?.slice(0, 8) ?? '-'}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {log.ipAddress ?? '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
