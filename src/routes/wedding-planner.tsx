import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CakeSlice,
  Car,
  ChevronLeft,
  ChevronRight,
  Flower2,
  GlassWater,
  MessageCircle,
  PartyPopper,
  Sparkles,
  X,
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
  cardImage: string;
  images: string[];
};

const makeWeddingPlannerImages = (folder: string, count: number) =>
  Array.from(
    { length: count },
    (_, index) => `/wedding-planner/${folder}/image${String(index + 1).padStart(5, "0")}.jpeg`,
  );

const voitureImages = makeWeddingPlannerImages("voiture", 13);
const decorationImages = makeWeddingPlannerImages("decoration", 28);
const dessertImages = makeWeddingPlannerImages("dessert", 26);
const saleJusSucreImages = makeWeddingPlannerImages("sale-jus-sucre", 37);
const soireePriveeEtCeremonieImages = makeWeddingPlannerImages(
  "soiree-privee%20et%20ceremonie",
  13,
);

const services: Service[] = [
  {
    title: "Voiture de luxe",
    description:
      "Voiture de luxe au choix avec chauffeur pour une arrivée élégante lors de vos mariages, fiançailles et cérémonies.",
    icon: Car,
    cardImage: voitureImages[0],
    images: voitureImages,
  },
  {
    title: "Décoration mariage",
    description: "Décoration florale, tables, lumières, entrée des mariés et ambiance sur mesure.",
    icon: Flower2,
    cardImage: decorationImages[0],
    images: decorationImages,
  },
  {
    title: "Wedding dessert",
    description: "Buffet dessert élégant, gâteaux, mini douceurs et présentation premium.",
    icon: CakeSlice,
    cardImage: dessertImages[0],
    images: dessertImages,
  },
  {
    title: "Salé, jus & sucré",
    description:
      "Service complet pour vos invités : salé, jus frais, sucré et présentation raffinée.",
    icon: GlassWater,
    cardImage: saleJusSucreImages[0],
    images: saleJusSucreImages,
  },
  {
    title: "Soiree privee et ceremonie",
    description:
      "Organisation complète pour anniversaires, soirées familiales, VIP events, événements privés et cérémonies élégantes.",
    icon: PartyPopper,
    cardImage: soireePriveeEtCeremonieImages[0],
    images: soireePriveeEtCeremonieImages,
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
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.78)_62%,rgba(0,0,0,0.96)_100%)]" />
      <div className="absolute inset-0 bg-radial-gold opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-3 border border-gold/35 bg-black/35 px-5 py-3 backdrop-blur">
          <Sparkles size={15} className="text-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold">
            Trabelsi Wedding Planner
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
            "Décoration mariage",
            "Voiture de luxe mariage",
            "Soiree privee et ceremonie",
            "Wedding dessert",
            "Salé, jus & sucré",
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openServiceGallery = (service: Service) => {
    setSelectedService(service);
    setLightboxIndex(0);
  };

  const closeLightbox = useCallback(() => {
    setSelectedService(null);
    setLightboxIndex(0);
  }, []);

  const goNext = useCallback(() => {
    if (!selectedService) return;
    setLightboxIndex((current) => (current + 1) % selectedService.images.length);
  }, [selectedService]);

  const goPrev = useCallback(() => {
    if (!selectedService) return;
    setLightboxIndex(
      (current) => (current - 1 + selectedService.images.length) % selectedService.images.length,
    );
  }, [selectedService]);

  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-gold opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              Nos Services Premium
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-3xl leading-tight text-white sm:text-5xl md:text-6xl">
            L'univers <span className="text-gradient-gold">Trabelsi Wedding Planner</span>
          </h2>
          <p className="mt-6 text-sm leading-8 text-foreground/64 sm:text-lg">
            Chaque détail est pensé pour créer une expérience élégante, raffinée et inoubliable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(380px,auto)]">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onOpen={() => openServiceGallery(service)}
            />
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

      {selectedService && (
        <ServiceGalleryLightbox
          service={selectedService}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </section>
  );
}

function ServiceCard({
  service,
  index,
  onOpen,
}: {
  service: Service;
  index: number;
  onOpen: () => void;
}) {
  const Icon = service.icon;
  const isFeatured = service.title === "Décoration mariage";

  return (
    <article
      className={[
        "group relative flex min-h-[380px] cursor-pointer overflow-hidden rounded-3xl border border-gold/25 bg-[linear-gradient(135deg,rgba(17,14,8,0.98),rgba(0,0,0,0.96))] shadow-card transition-all duration-700 ease-out focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-background",
        "hover:-translate-y-2 hover:border-gold/80 hover:shadow-[0_30px_90px_-28px_rgba(212,175,55,0.65)]",
        "md:min-h-[400px]",
        isFeatured ? "lg:col-span-2 lg:min-h-[460px]" : "lg:min-h-[390px]",
      ].join(" ")}
      style={{ animationDelay: `${index * 0.08}s` }}
      role="button"
      tabIndex={0}
      aria-label={`Voir les photos : ${service.title}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <ServiceCardBackground
        src={service.cardImage}
        fallbackSrc={service.images[0]}
        alt={service.title}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/58 to-black/8" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(212,175,55,0.22),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.08),transparent_24%)] opacity-80" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-1000 group-hover:translate-x-[260%]" />
      </div>
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-70" />
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex min-h-full w-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="inline-flex items-center gap-3 rounded-full border border-gold/35 bg-black/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur-md">
            <Sparkles size={12} />
            Service Premium
          </div>
          <span className="font-display text-5xl leading-none text-white/20 transition-colors duration-500 group-hover:text-gold/45">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-14 bg-gradient-to-r from-gold to-transparent" />
            <Icon size={20} className="text-gold" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-3xl leading-tight text-white transition-colors duration-500 group-hover:text-gold sm:text-4xl">
            {service.title}
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/72 sm:text-base">
            {service.description}
          </p>
          <span className="mt-7 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.24em] text-gold transition-all duration-500 group-hover:text-gold-soft">
            Voir les photos
            <ArrowRight
              size={15}
              className="ml-3 transition-transform duration-500 group-hover:translate-x-2"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

function ServiceCardBackground({
  src,
  fallbackSrc,
  alt,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasImage, setHasImage] = useState(true);

  useEffect(() => {
    setCurrentSrc(src);
    setHasImage(true);
  }, [src]);

  if (!hasImage) return null;

  return (
    <img
      src={currentSrc}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1600ms] ease-out group-hover:scale-110"
      loading="lazy"
      decoding="async"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }

        setHasImage(false);
      }}
    />
  );
}

function ServiceGalleryLightbox({
  service,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  service: Service;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const currentImage = service.images[index] ?? service.images[0] ?? "";
  const totalImages = service.images.length;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch?.clientX ?? null;
    touchStartY.current = touch?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];

    if (!touch || touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

    if (deltaX < 0) {
      onNext();
    } else {
      onPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-[100dvh] flex-col overflow-hidden bg-[#030303]/96 text-white backdrop-blur-md md:backdrop-blur-2xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie ${service.title}`}
    >
      <div className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Fermer la galerie"
        className="absolute right-4 top-4 z-[10010] flex h-11 w-11 items-center justify-center rounded-full border border-gold/45 bg-black/80 text-gold shadow-gold transition-all duration-300 hover:bg-gradient-gold hover:text-primary-foreground sm:right-6 sm:top-6"
      >
        <X size={18} />
      </button>

      <div className="relative z-[10000] flex shrink-0 items-center justify-between gap-4 px-4 pb-4 pr-20 pt-5 sm:px-8 sm:pt-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
            Service Premium
          </p>
          <h3 className="mt-2 font-display text-2xl text-white sm:text-4xl">{service.title}</h3>
        </div>
        <span className="hidden rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-gold sm:inline-flex">
          {index + 1} / {totalImages}
        </span>
      </div>

      <div className="relative z-[10000] flex min-h-0 flex-1 items-center justify-center px-4 pb-7 sm:px-16">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Image précédente"
          className="absolute left-3 top-1/2 z-[10010] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-black/80 text-gold shadow-gold transition-all duration-300 hover:bg-gradient-gold hover:text-primary-foreground sm:left-6 sm:h-14 sm:w-14"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          className="relative flex w-full max-w-6xl items-center justify-center"
          onClick={(event) => event.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <LightboxImage src={currentImage} alt={service.title} />
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Image suivante"
          className="absolute right-3 top-1/2 z-[10010] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-black/80 text-gold shadow-gold transition-all duration-300 hover:bg-gradient-gold hover:text-primary-foreground sm:right-6 sm:h-14 sm:w-14"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="relative z-[10000] flex shrink-0 justify-center px-4 pb-5 sm:hidden">
        <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-gold">
          {index + 1} / {totalImages}
        </span>
      </div>
    </div>
  );
}

function LightboxImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div className="relative flex min-h-[46dvh] w-full items-center justify-center overflow-hidden rounded-3xl border border-gold/25 bg-black/60 shadow-gold md:min-h-[62dvh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_42%)]" />

      {!hasError && src ? (
        <img
          key={src}
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          decoding="async"
          className="relative z-10 max-h-[72dvh] w-full object-contain md:max-h-[80dvh]"
          draggable={false}
        />
      ) : (
        <div className="relative z-10 flex min-h-[46dvh] w-full flex-col items-center justify-center px-8 text-center md:min-h-[62dvh]">
          <Sparkles size={24} className="text-gold" strokeWidth={1.5} />
          <p className="mt-4 font-display text-2xl text-white">{alt}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-foreground/55">
            Cette image sera affichée dès qu'elle sera disponible dans le dossier public.
          </p>
        </div>
      )}
    </div>
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
