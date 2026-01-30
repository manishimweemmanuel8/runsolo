import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">Manage and send invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Invoice management coming soon. Use the same pattern as Clients to
            implement full CRUD functionality with PDF generation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
