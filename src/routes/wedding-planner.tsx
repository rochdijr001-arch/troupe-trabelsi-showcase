import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CakeSlice,
  CalendarCheck,
  Car,
  Flower2,
  GlassWater,
  MessageCircle,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

const WHATSAPP_URL =
  "https://wa.me/21624739679?text=Bonjour%20Troupe%20Trabelsi%2C%20je%20souhaite%20organiser%20un%20%C3%A9v%C3%A9nement%20avec%20vos%20services%20Wedding%20Planner.";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Voiture de luxe",
    description:
      "Arrivée élégante avec des voitures premium pour mariages, fiançailles et cérémonies.",
    icon: Car,
  },
  {
    title: "Décoration mariage",
    description: "Décoration florale, tables, lumières, entrée des mariés et ambiance sur mesure.",
    icon: Flower2,
  },
  {
    title: "Wedding dessert",
    description: "Buffet dessert élégant, gâteaux, mini douceurs et présentation premium.",
    icon: CakeSlice,
  },
  {
    title: "Salé, jus & sucré",
    description:
      "Service complet pour vos invités : salé, jus frais, sucré et présentation raffinée.",
    icon: GlassWater,
  },
  {
    title: "Soirée privée",
    description:
      "Organisation complète pour anniversaires, soirées familiales, VIP events et événements privés.",
    icon: PartyPopper,
  },
  {
    title: "Cérémonie",
    description: "Gestion de la cérémonie, entrée, ambiance, coordination et détails élégants.",
    icon: CalendarCheck,
  },
];

export const Route = createFileRoute("/wedding-planner")({
  head: () => ({
    meta: [
      { title: "Wedding Planner de Luxe | Troupe Trabelsi" },
      {
        name: "description",
        content:
          "Wedding planner Tunisie et Monastir : décoration mariage Tunisie, voiture de luxe mariage, desserts, cérémonies et soirée privée Tunisie.",
      },
      { property: "og:title", content: "Wedding Planner de Luxe | Troupe Trabelsi" },
      {
        property: "og:description",
        content:
          "Une organisation complète et premium pour mariages, cérémonies et soirées privées en Tunisie.",
      },
    ],
  }),
  component: WeddingPlannerPage,
});

function WeddingPlannerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhatsAppCta />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[86vh] items-center overflow-hidden pt-32 pb-20"
    >
      <img
        src="/photo/image00010.jpeg"
        alt="Organisation premium de mariage par Troupe Trabelsi"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.78)_62%,rgba(0,0,0,0.96)_100%)]" />
      <div className="absolute inset-0 bg-radial-gold opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-3 border border-gold/35 bg-black/35 px-5 py-3 backdrop-blur">
          <Sparkles size={15} className="text-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold">
            Wedding planner Tunisie
          </span>
        </div>

        <h1 className="mx-auto max-w-5xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
          <span className="text-gradient-gold animate-shimmer">Wedding Planner</span> de Luxe
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-sm leading-8 text-white/74 sm:text-lg">
          Voitures de luxe, décoration, desserts, salé, jus, sucré, cérémonies et soirées privées —
          une organisation complète pour une soirée inoubliable.
        </p>

        <div className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-3">
          {[
            "Wedding planner Monastir",
            "Décoration mariage Tunisie",
            "Voiture de luxe mariage",
            "Soirée privée Tunisie",
          ].map((keyword) => (
            <span
              key={keyword}
              className="border border-gold/25 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-gold/85 backdrop-blur"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-11 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-3 bg-gradient-gold px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-gold transition-all duration-500 hover:scale-[1.03] active:scale-95"
          >
            Découvrir les services
            <ArrowRight size={16} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-gold/50 bg-black/45 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur transition-all duration-500 hover:border-gold hover:bg-gold/10 active:scale-95"
          >
            WhatsApp
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-gold opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Services de luxe</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-3xl leading-tight text-white sm:text-5xl md:text-6xl">
            Une organisation <span className="text-gradient-gold">complète</span>
          </h2>
          <p className="mt-6 text-sm leading-8 text-foreground/64 sm:text-lg">
            Notre équipe accompagne chaque détail : scénographie, timing, invités, esthétique et
            coordination le jour J.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl text-center">
          <div className="gold-divider mb-8" />
          <p className="text-sm leading-8 text-foreground/62 sm:text-base">
            Troupe Trabelsi propose un service Wedding planner Tunisie avec une présence forte à
            Monastir : décoration mariage Tunisie, voiture de luxe mariage, coordination de
            cérémonie et soirée privée Tunisie pour des événements premium.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <article
      className="group relative min-h-[250px] overflow-hidden rounded-lg border border-gold/20 bg-card p-7 shadow-card hover-lift"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-gold/35 bg-gold/5 transition-all duration-500 group-hover:border-gold group-hover:bg-gradient-gold group-hover:shadow-gold">
          <Icon
            size={24}
            className="text-gold transition-colors duration-500 group-hover:text-primary-foreground"
            strokeWidth={1.6}
          />
        </div>
        <h3 className="font-display text-2xl text-white transition-colors duration-500 group-hover:text-gold">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-foreground/65">{service.description}</p>
      </div>
    </article>
  );
}

function WhatsAppCta() {
  return (
    <section className="relative overflow-hidden border-y border-gold/20 py-24 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.14),rgba(0,0,0,0.2)_42%,rgba(212,175,55,0.08))]" />
      <div className="absolute inset-0 bg-radial-gold opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-lg border border-gold/40 bg-black/50 shadow-gold">
          <MessageCircle size={28} className="text-gold" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-3xl leading-tight text-white sm:text-5xl md:text-6xl">
          Vous voulez organiser votre <span className="text-gradient-gold">événement ?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-foreground/70 sm:text-lg">
          Envoyez-nous les détails de votre soirée et notre équipe vous répond directement sur
          WhatsApp.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center gap-3 bg-gradient-gold px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-gold transition-all duration-500 hover:scale-[1.03] active:scale-95"
        >
          Demander un devis sur WhatsApp
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
