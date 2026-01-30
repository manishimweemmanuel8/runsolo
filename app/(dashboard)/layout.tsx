import { requireAuth } from '@/app/proxy';
import { Sidebar } from '@/components/shared/sidebar';
import { Header } from '@/components/shared/header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  const isAdmin = session.user.role === 'admin';

  return (
    <div className="flex h-screen">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}
