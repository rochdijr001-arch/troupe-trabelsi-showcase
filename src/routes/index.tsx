import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Singers } from "@/components/site/Singers";
import { Packs } from "@/components/site/Packs";
import { Gallery } from "@/components/site/Gallery";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Singers />
        <Packs />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
