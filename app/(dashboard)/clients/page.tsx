'use client';

import Link from 'next/link';
import { useClients, useDeleteClient } from '@/hooks/use-clients';
import { ClientTable } from '@/components/shared/client-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function ClientsPage() {
  const { data, isLoading } = useClients();
  const deleteClient = useDeleteClient();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      await deleteClient.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships
          </p>
        </div>
        <Link href="/clients/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <CardDescription>
            {data?.total ?? 0} client{data?.total !== 1 ? 's' : ''} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientTable
            clients={data?.clients ?? []}
            isLoading={isLoading}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
