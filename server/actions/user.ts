'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/app/proxy';
import { createAuditLog, sanitizeForAudit } from '@/lib/audit';
import { updateProfileSchema, type UpdateProfileInput } from '@/lib/validators/user';
import * as userService from '@/server/services/user.service';

export async function getProfile() {
  const session = await requireAuth();
  return userService.getUserById(session.user.id);
}

export async function updateProfile(input: UpdateProfileInput) {
  const session = await requireAuth();
  const data = updateProfileSchema.parse(input);

  const oldUser = await userService.getUserById(session.user.id);
  if (!oldUser) {
    return { success: false, error: 'User not found' };
  }

  const updatedUser = await userService.updateUserProfile(session.user.id, {
    name: data.name,
    image: data.image || null,
  });

  if (updatedUser) {
    await createAuditLog({
      userId: session.user.id,
      action: 'update',
      entity: 'user',
      entityId: session.user.id,
      oldValue: sanitizeForAudit(oldUser),
      newValue: sanitizeForAudit(updatedUser),
    });
  }

  revalidatePath('/settings');
  return { success: true, data: updatedUser };
}
