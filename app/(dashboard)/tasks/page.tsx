import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">
          Manage your tasks and to-do items
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Task management coming soon. Use the same pattern as Clients to
            implement full CRUD functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
