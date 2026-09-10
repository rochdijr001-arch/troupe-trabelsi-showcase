import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

const WHATSAPP_URL =
  "https://wa.me/21624739679?text=Bonjour%20Troupe%20Trabelsi%2C%20je%20souhaite%20organiser%20un%20%C3%A9v%C3%A9nement%20avec%20vos%20services%20Wedding%20Planner.";

type Service = {
  title: string;
  description: string;
  cardImage: string;
  images: string[];
};

const makeWeddingPlannerImages = (folder: string, imageNames: string[]) =>
  imageNames.map((imageName) => `/wedding-planner/${folder}/${imageName}.jpeg`);

const makeSequentialWeddingPlannerImages = (folder: string, count: number) =>
  makeWeddingPlannerImages(
    folder,
    Array.from({ length: count }, (_, index) => `image${String(index + 1).padStart(5, "0")}`),
  );

const voitureImages = makeWeddingPlannerImages("voiture", [
  "pdp",
  "WhatsApp Image 2026-06-28 at 2.38.02 PM",
  "WhatsApp Image 2026-07-02 at 11.54.46 PM (1)",
  "WhatsApp Image 2026-07-02 at 11.54.46 PM",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM (1)",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM (2)",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM (3)",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM (4)",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM (5)",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM (6)",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM (7)",
  "WhatsApp Image 2026-07-02 at 11.54.47 PM",
  "WhatsApp Image 2026-07-02 at 11.54.48 PM (1)",
  "WhatsApp Image 2026-07-02 at 11.54.48 PM (2)",
  "WhatsApp Image 2026-07-02 at 11.54.48 PM (3)",
  "WhatsApp Image 2026-07-02 at 11.54.48 PM (4)",
  "WhatsApp Image 2026-07-02 at 11.54.48 PM",
]);
const decorationImages = makeWeddingPlannerImages("decoration", [
  ...Array.from({ length: 4 }, (_, index) => `image${String(index + 1).padStart(5, "0")}`),
  ...Array.from({ length: 16 }, (_, index) => `image${String(index + 6).padStart(5, "0")}`),
  ...Array.from({ length: 6 }, (_, index) => `image${String(index + 23).padStart(5, "0")}`),
]);
const dessertImages = makeWeddingPlannerImages("dessert", [
  ...Array.from({ length: 24 }, (_, index) => `image${String(index + 1).padStart(5, "0")}`),
  "image00026",
]);
const saleJusSucreImages = makeWeddingPlannerImages("sale-jus-sucre", [
  "WhatsApp Image 2026-07-03 at 12.03.05 AM",
  "WhatsApp Image 2026-07-03 at 12.03.06 AM",
  "WhatsApp Image 2026-07-03 at 12.03.07 AM (1)",
  "WhatsApp Image 2026-07-03 at 12.03.07 AM (2)",
  "WhatsApp Image 2026-07-03 at 12.03.07 AM (3)",
  "WhatsApp Image 2026-07-03 at 12.03.07 AM (4)",
  "WhatsApp Image 2026-07-03 at 12.03.07 AM (5)",
  "WhatsApp Image 2026-07-03 at 12.03.07 AM",
  "WhatsApp Image 2026-07-03 at 12.03.08 AM (1)",
  "WhatsApp Image 2026-07-03 at 12.03.08 AM (2)",
  "WhatsApp Image 2026-07-03 at 12.03.08 AM (3)",
  "WhatsApp Image 2026-07-03 at 12.03.08 AM (4)",
  "WhatsApp Image 2026-07-03 at 12.03.08 AM (5)",
  "WhatsApp Image 2026-07-03 at 12.03.08 AM",
]);
const soireePriveeEtCeremonieImages = makeWeddingPlannerImages(
  "soiree-privee%20et%20ceremonie",
  [
    ...Array.from({ length: 4 }, (_, index) => `image${String(index + 1).padStart(5, "0")}`),
    ...Array.from({ length: 11 }, (_, index) => `image${String(index + 6).padStart(5, "0")}`),
  ],
);

const services: Service[] = [
  {
    title: "Voiture de luxe",
    description: "Voiture de luxe au choix avec chauffeur.",
    cardImage: voitureImages[0],
    images: voitureImages,
  },
  {
    title: "Décoration mariage",
    description: "Décoration florale, lumières et ambiance sur mesure.",
    cardImage: decorationImages[0],
    images: decorationImages,
  },
  {
    title: "Wedding dessert",
    description: "Buffet dessert élégant et présentation premium.",
    cardImage: dessertImages[0],
    images: dessertImages,
  },
  {
    title: "Salé, jus & sucré",
    description: "Salé, jus frais, sucré et service raffiné.",
    cardImage: saleJusSucreImages[0],
    images: saleJusSucreImages,
  },
  {
    title: "Soirée privée et cérémonie",
    description: "Organisation complète pour vos événements privés.",
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
        src="/wedding-planner/hero-bg.jpg"
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

  const openServiceGallery = (service: Service) => {
    setSelectedService(service);
  };

  const closeAlbum = () => {
    setSelectedService(null);
  };

  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-radial-gold opacity-20" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold">
            Wedding Planner
          </p>
          <h2 className="font-display text-3xl leading-tight text-white sm:text-5xl">
            L'univers <span className="text-gradient-gold">Trabelsi Wedding Planner</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onOpen={() => openServiceGallery(service)}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceAlbumOverlay service={selectedService} onClose={closeAlbum} />
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
  const isFeatured = service.title === "Décoration mariage";

  return (
    <article
      className={[
        "group relative flex min-h-[420px] cursor-pointer overflow-hidden rounded-3xl border border-gold/20 bg-black shadow-[0_18px_60px_-46px_rgba(0,0,0,0.95)] transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-background",
        "hover:-translate-y-1 hover:border-gold/65 hover:shadow-[0_26px_80px_-54px_rgba(212,175,55,0.48)]",
        "md:min-h-[460px]",
        isFeatured ? "lg:col-span-4 lg:min-h-[500px]" : "lg:col-span-2 lg:min-h-[500px]",
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

      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/88 via-black/34 to-transparent" />

      <div className="relative z-10 flex min-h-full w-full items-end p-5 sm:p-7">
        <div className="max-w-lg">
          <h3 className="font-display text-2xl leading-tight text-white transition-colors duration-500 group-hover:text-gold sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/70 transition-all duration-500 group-hover:translate-y-[-2px] group-hover:text-white/90">
            {service.description}
          </p>
          <span className="mt-5 inline-flex min-h-11 items-center text-[10px] font-bold uppercase tracking-[0.24em] text-gold transition-colors duration-500 group-hover:text-gold-soft sm:text-[11px]">
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
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
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

function ServiceAlbumOverlay({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  const goNext = useCallback(() => {
    setZoomedIndex((current) =>
      current === null ? null : (current + 1) % service.images.length,
    );
  }, [service.images.length]);

  const goPrev = useCallback(() => {
    setZoomedIndex((current) =>
      current === null ? null : (current - 1 + service.images.length) % service.images.length,
    );
  }, [service.images.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (zoomedIndex !== null) {
          setZoomedIndex(null);
        } else {
          onClose();
        }
      }
      if (zoomedIndex !== null) {
        if (event.key === "ArrowRight") goNext();
        if (event.key === "ArrowLeft") goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, zoomedIndex, goNext, goPrev]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-[100dvh] flex-col overflow-hidden bg-[#030303]/96 text-white backdrop-blur-md md:backdrop-blur-2xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Album ${service.title}`}
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
        aria-label="Fermer l'album"
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
          {service.images.length} photos
        </span>
      </div>

      <div
        className="relative z-[10000] min-h-0 flex-1 overflow-y-auto px-4 pb-8 sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {service.images.map((src, idx) => (
            <AlbumTile
              key={src}
              src={src}
              alt={service.title}
              idx={idx}
              onOpen={() => setZoomedIndex(idx)}
            />
          ))}
        </div>
      </div>

      {zoomedIndex !== null && (
        <ZoomedImage
          images={service.images}
          index={zoomedIndex}
          alt={service.title}
          onClose={() => setZoomedIndex(null)}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </div>
  );
}

function AlbumTile({
  src,
  alt,
  idx,
  onOpen,
}: {
  src: string;
  alt: string;
  idx: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-gold/20"
      onClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      role="button"
      tabIndex={0}
      aria-label={`Voir la photo ${idx + 1}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      style={{ animationDelay: `${(idx % 8) * 0.06}s` }}
    >
      <div className="relative h-full w-full overflow-hidden bg-[#080704]">
        {!loaded && !hasError && (
          <div className="absolute inset-0 border border-gold/10 bg-[linear-gradient(135deg,rgba(212,175,55,0.08),rgba(0,0,0,0.08),rgba(212,175,55,0.04))]" />
        )}

        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#080704] text-[10px] font-bold uppercase tracking-[0.24em] text-gold/70">
            Photo
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setHasError(true);
              setLoaded(true);
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 260ms ease" }}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/20 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1.5px #D4AF37" }}
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/70 bg-[#0a0a0a]/60 backdrop-blur transition-transform duration-300 ease-out group-hover:scale-110">
          <ZoomIn size={18} className="text-gold" />
        </div>
      </div>
    </div>
  );
}

function ZoomedImage({
  images,
  index,
  alt,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const src = images[index] ?? "";

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
  }, [src]);

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
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-[#030303]/96 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Fermer la photo"
        className="absolute right-4 top-4 z-[10060] flex h-11 w-11 items-center justify-center rounded-full border border-gold/45 bg-black/80 text-gold shadow-gold transition-all duration-300 hover:bg-gradient-gold hover:text-primary-foreground sm:right-6 sm:top-6"
      >
        <X size={18} />
      </button>

      {images.length > 1 && (
        <span className="absolute left-1/2 top-4 z-[10060] -translate-x-1/2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-gold sm:top-6">
          {index + 1} / {images.length}
        </span>
      )}

      {images.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Photo précédente"
          className="absolute left-3 top-1/2 z-[10060] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-black/80 text-gold shadow-gold transition-all duration-300 hover:bg-gradient-gold hover:text-primary-foreground sm:left-6 sm:h-14 sm:w-14"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <div
        className="relative flex max-h-full max-w-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {!loaded && !hasError && (
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        )}

        {hasError ? (
          <div className="flex h-[40vh] w-[min(82vw,900px)] items-center justify-center rounded-2xl border border-gold/25 bg-[#080704] text-xs font-bold uppercase tracking-[0.28em] text-gold/70">
            Photo indisponible
          </div>
        ) : (
          <img
            key={src}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setHasError(true);
              setLoaded(true);
            }}
            className="max-h-[88vh] max-w-full rounded-2xl border border-gold/25 object-contain shadow-gold"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 260ms ease" }}
            draggable={false}
          />
        )}
      </div>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Photo suivante"
          className="absolute right-3 top-1/2 z-[10060] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-black/80 text-gold shadow-gold transition-all duration-300 hover:bg-gradient-gold hover:text-primary-foreground sm:right-6 sm:h-14 sm:w-14"
        >
          <ChevronRight size={22} />
        </button>
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
