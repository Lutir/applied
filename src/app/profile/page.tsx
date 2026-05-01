import { Nav } from "@/components/nav";
import { ProfileClient } from "@/components/profile-client";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Nav />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-warm-brown">Your Profile</h1>
          <p className="text-muted-foreground mt-1">Progress, badges, and streak history.</p>
        </div>
        <ProfileClient />
      </main>
    </div>
  );
}
