import { Nav } from "@/components/nav";
import { DashboardClient } from "@/components/dashboard-client";
import { curriculum } from "@/data/curriculum";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Nav />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 space-y-8">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-bold text-warm-brown">Welcome back</h1>
          <p className="text-muted-foreground">Your journey to Applied Scientist continues.</p>
        </div>
        <DashboardClient curriculum={curriculum} />
      </main>
    </div>
  );
}
