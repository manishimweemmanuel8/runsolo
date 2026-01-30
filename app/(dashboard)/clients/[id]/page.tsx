'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useClient, useUpdateClient, useDeleteClient } from '@/hooks/use-clients';
import { ClientForm } from '@/components/shared/client-form';
import type { CreateClientInput } from '@/lib/validators/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: client, isLoading } = useClient(id);
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const [defaultValues, setDefaultValues] = useState<CreateClientInput | undefined>();

  useEffect(() => {
    if (client) {
      setDefaultValues({
        name: client.name,
        email: client.email ?? '',
        phone: client.phone ?? '',
        company: client.company ?? '',
        address: client.address ?? '',
        notes: client.notes ?? '',
      });
    }
  }, [client]);

  const handleSubmit = async (data: CreateClientInput) => {
    const result = await updateClient.mutateAsync({ id, ...data });
    if (result.success) {
      router.push('/clients');
    }
  };

  const handleCancel = () => {
    router.push('/clients');
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this client?')) {
      const result = await deleteClient.mutateAsync(id);
      if (result.success) {
        router.push('/clients');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Client not found</p>
        <Link href="/clients">
          <Button variant="link">Back to clients</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">Edit client details</p>
          </div>
        </div>
        <Button variant="destructive" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
          <CardDescription>Update the client information</CardDescription>
        </CardHeader>
        <CardContent>
          {defaultValues && (
            <ClientForm
              key={client.id}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitLabel="Save Changes"
              isLoading={updateClient.isPending}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
