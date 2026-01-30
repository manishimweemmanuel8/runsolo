'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreateClient } from '@/hooks/use-clients';
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
import { ArrowLeft } from 'lucide-react';

export default function NewClientPage() {
  const router = useRouter();
  const createClient = useCreateClient();

  const handleSubmit = async (data: CreateClientInput) => {
    const result = await createClient.mutateAsync(data);
    if (result.success) {
      router.push('/clients');
    }
  };

  const handleCancel = () => {
    router.push('/clients');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/clients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">New Client</h1>
          <p className="text-muted-foreground">Add a new client to your list</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
          <CardDescription>
            Enter the information for your new client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Create Client"
            isLoading={createClient.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
