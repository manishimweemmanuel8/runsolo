import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TimePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Time Tracking</h1>
        <p className="text-muted-foreground">Track your working hours</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Time tracking coming soon. Use the same pattern as Clients to
            implement full CRUD functionality with timer support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
