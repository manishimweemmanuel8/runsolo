'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/server/actions/user';
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from '@/lib/validators/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Check } from 'lucide-react';
import { useState } from 'react';

interface ProfileFormProps {
  defaultValues: {
    name: string;
    image?: string | null;
  };
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues.name,
      image: defaultValues.image ?? '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (result) => {
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    await mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          disabled={mutation.isPending}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Profile Image URL</Label>
        <Input
          id="image"
          type="url"
          placeholder="https://example.com/avatar.jpg"
          disabled={mutation.isPending}
          {...register('image')}
        />
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Enter a URL to an image for your profile picture
        </p>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" disabled={mutation.isPending || !isDirty}>
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : showSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
}
