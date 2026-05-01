import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { WeekDetailClient } from "@/components/week-detail-client";
import { curriculum } from "@/data/curriculum";

export default async function WeekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const weekId = parseInt(id, 10);
  const week = curriculum.find((w) => w.id === weekId);

  if (!week || isNaN(weekId)) notFound();

  return (
    <div className="flex flex-col min-h-full">
      <Nav />
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 sm:px-6 py-8">
        <WeekDetailClient week={week} />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return curriculum.map((w) => ({ id: String(w.id) }));
}
