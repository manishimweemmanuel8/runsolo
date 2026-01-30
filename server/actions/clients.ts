'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/app/proxy';
import { createAuditLog, sanitizeForAudit } from '@/lib/audit';
import {
  createClientSchema,
  updateClientSchema,
  type CreateClientInput,
} from '@/lib/validators/client';
import * as clientService from '@/server/services/client.service';

export async function getClients(options?: { page?: number; limit?: number }) {
  const session = await requireAuth();
  return clientService.getClientsByUserId(session.user.id, options);
}

export async function getClient(id: string) {
  const session = await requireAuth();
  return clientService.getClientById(id, session.user.id);
}

export async function createClient(input: CreateClientInput) {
  const session = await requireAuth();
  const data = createClientSchema.parse(input);

  const client = await clientService.createClient({
    ...data,
    userId: session.user.id,
    email: data.email || null,
  });

  await createAuditLog({
    userId: session.user.id,
    action: 'create',
    entity: 'client',
    entityId: client.id,
    newValue: sanitizeForAudit(client),
  });

  revalidatePath('/clients');
  return { success: true, data: client };
}

export async function updateClient(input: unknown) {
  const session = await requireAuth();
  const data = updateClientSchema.parse(input);

  const oldClient = await clientService.getClientById(data.id, session.user.id);
  if (!oldClient) {
    return { success: false, error: 'Client not found' };
  }

  const { id, ...updateData } = data;
  const client = await clientService.updateClient(
    id,
    session.user.id,
    updateData
  );

  if (client) {
    await createAuditLog({
      userId: session.user.id,
      action: 'update',
      entity: 'client',
      entityId: client.id,
      oldValue: sanitizeForAudit(oldClient),
      newValue: sanitizeForAudit(client),
    });
  }

  revalidatePath('/clients');
  revalidatePath(`/clients/${id}`);
  return { success: true, data: client };
}

export async function deleteClient(id: string) {
  const session = await requireAuth();

  const oldClient = await clientService.getClientById(id, session.user.id);
  if (!oldClient) {
    return { success: false, error: 'Client not found' };
  }

  const success = await clientService.deleteClient(id, session.user.id);

  if (success) {
    await createAuditLog({
      userId: session.user.id,
      action: 'delete',
      entity: 'client',
      entityId: id,
      oldValue: sanitizeForAudit(oldClient),
    });
  }

  revalidatePath('/clients');
  return { success };
}
