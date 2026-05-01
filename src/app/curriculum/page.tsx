import { Nav } from "@/components/nav";
import { CurriculumClient } from "@/components/curriculum-client";
import { curriculum } from "@/data/curriculum";

export default function CurriculumPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Nav />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 space-y-10">
        <div>
          <h1 className="font-heading text-3xl font-bold text-warm-brown">12-Month Curriculum</h1>
          <p className="text-muted-foreground mt-1">
            52 weeks, 3 sessions/week. Your path from SDE to Applied Scientist.
          </p>
        </div>
        <CurriculumClient curriculum={curriculum} />
      </main>
    </div>
  );
}
