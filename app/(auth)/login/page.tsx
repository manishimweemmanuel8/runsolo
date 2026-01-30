import { Suspense } from 'react';
import { LoginForm } from '@/components/shared/login-form';
import { Loader2 } from 'lucide-react';

function LoginFormFallback() {
  return (
    <div className="flex h-40 w-full max-w-md items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}
