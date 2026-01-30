import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  phone: z.string().max(20, 'Phone number is too long').optional(),
  company: z.string().max(100, 'Company name is too long').optional(),
  address: z.string().max(500, 'Address is too long').optional(),
  notes: z.string().max(2000, 'Notes are too long').optional(),
});

export const updateClientSchema = createClientSchema.partial().extend({
  id: z.string().uuid('Invalid client ID'),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
