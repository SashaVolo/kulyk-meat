import Catalog from "@/components/Catalog";
import Hero from "@/components/Hero";
import Separator from "@/components/Separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <Separator />

      <Catalog />
    </main>
  );
}
