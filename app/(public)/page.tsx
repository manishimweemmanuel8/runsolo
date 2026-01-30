import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Clock, FileText, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold">RunSolo</div>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Freelance Smarter,
            <br />
            Not Harder
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            RunSolo helps freelancers manage clients, track time, and send
            invoices &mdash; all in one simple, distraction-free platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Stop Juggling Spreadsheets and Apps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Most freelancers waste hours every week switching between tools.
              RunSolo brings everything together.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Client Management</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep all your client information organized in one place.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Time Tracking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Track your hours effortlessly and never miss billable time.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Simple Invoicing</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create and send professional invoices in minutes.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Task Management</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Stay on top of your work with simple task tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Built for Solo Professionals</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No bloated features. No complex setup. Just what you need to run
              your freelance business.
            </p>
          </div>

          <ul className="mt-12 space-y-4">
            {[
              'Simple, distraction-free interface',
              'No team features you don\'t need',
              'Fast and lightweight',
              'Secure and private',
              'Works on any device',
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <Link href="/login">
              <Button size="lg">Start Managing Your Business</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RunSolo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
