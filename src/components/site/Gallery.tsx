import { useCallback, useEffect, useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

/* ─────────────────────────────────────────────
   EVENT PHOTOS
   → Swap "/photo/..." paths to "/galerie/..."
     once your galerie folder is in public/
───────────────────────────────────────────── */
type GalleryImage = {
  src: string;
  label: string;
  span?: "tall" | "wide" | "normal";
};

const LABELS = [
  "Soirée de gala · Sidi Bou Saïd",
  "Performance live · Hammamet",
  "Mariage privé · La Marsa",
  "Soirée d'entreprise · Carthage",
  "Anniversaire de luxe · Sousse",
  "Cérémonie orientale · Monastir",
  "Show musical · Djerba",
  "Gala de prestige · Gammarth",
  "Mariage de rêve · Nabeul",
  "Mariage oriental · Sfax",
  "Performance scénique · Ariana",
  "Soirée de prestige · Monastir",
  "Soirée orientale · Sidi Bou Saïd",
  "Gala de mariage · Gammarth",
  "Hadhra · Tunis",
  "Spectacle Nouba · Sousse",
  "Intro violoniste · La Marsa",
  "Dabka Souriya · Hammamet",
  "Ziyara · Monastir",
  "Grand orchestre · Sfax",
];

const SPANS: GalleryImage["span"][] = ["tall", "normal", "normal", "normal", "tall", "normal", "normal", "wide", "normal", "tall"];

const galleryImages: GalleryImage[] = Array.from({ length: 77 }, (_, i) => ({
  src: `/photo/image${String(i + 1).padStart(5, "0")}.jpeg`,
  label: LABELS[i % LABELS.length],
  span: SPANS[i % SPANS.length],
}));

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const goNext = useCallback(() => setLightboxIdx(i => i === null ? null : (i + 1) % galleryImages.length), []);
  const goPrev = useCallback(() => setLightboxIdx(i => i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length), []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")      closeLightbox();
      if (e.key === "ArrowRight")  goNext();
      if (e.key === "ArrowLeft")   goPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightboxIdx, goNext, goPrev]);

  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [lightboxIdx]);

  return (
    <section id="galerie" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <SectionHeader
          eyebrow="Galerie & Shows"
          title={"Des moments <em class='italic text-gradient-gold'>inoubliables</em>"}
          subtitle="Un aperçu de nos plus belles créations — mariages, galas et soirées d'exception capturés dans toute leur splendeur."
        />

        {/* ── Stats bar ── */}
        <div className="flex flex-wrap justify-center gap-10 mb-16">
          {[
            { value: `${galleryImages.length}+`, label: "Photos d'événements" },
            { value: "600+",                      label: "Soirées réalisées"   },
            { value: "100%",                      label: "Clients satisfaits"  },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl text-gradient-gold">{s.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Masonry Grid ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, idx) => (
            <GalleryTile
              key={img.src}
              img={img}
              idx={idx}
              total={galleryImages.length}
              onOpen={() => openLightbox(idx)}
            />
          ))}
        </div>

        {/* ── Bottom tag ── */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold/30 bg-gold/5">
            <ImageIcon size={13} className="text-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              Galerie · Troupe Trabelsi — Tunisie & International
            </span>
            <ImageIcon size={13} className="text-gold" />
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIdx}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────
   GALLERY TILE
───────────────────────────────────────────── */
function GalleryTile({
  img, idx, total, onOpen,
}: {
  img: GalleryImage;
  idx: number;
  total: number;
  onOpen: () => void;
}) {
  return (
    <div
      className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden border border-gold/20 cursor-pointer hover-lift"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`Voir ${img.label} — photo ${idx + 1} sur ${total}`}
      onKeyDown={e => e.key === "Enter" && onOpen()}
      style={{ animationDelay: `${(idx % 8) * 0.06}s` }}
    >
      <img
        src={img.src}
        alt={img.label}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gold overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Gold border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px #D4AF37" }}
      />

      {/* Centre icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
        <div className="w-12 h-12 rounded-full border-2 border-gold/70 bg-[#0a0a0a]/60 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-400">
          <ZoomIn size={18} className="text-gold" />
        </div>
      </div>

      {/* Label at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{img.label}</p>
      </div>

      {/* Index badge */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] tracking-widest text-gold bg-[#0a0a0a]/70 backdrop-blur px-2 py-1 rounded-full border border-gold/30">
          {idx + 1}/{total}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({
  images, index, onClose, onNext, onPrev,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 10); return () => clearTimeout(t); }, []);
  useEffect(() => { setLoaded(false); }, [index]);

  const close = () => { setVisible(false); setTimeout(onClose, 300); };

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ transition: "opacity 300ms ease", opacity: visible ? 1 : 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(4,4,4,0.96)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        onClick={close}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 shrink-0">
        <div className="flex items-center gap-3">
          <ImageIcon size={14} className="text-gold" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Troupe Trabelsi · Galerie</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs tracking-widest text-foreground/40">{index + 1} / {images.length}</span>
          <button
            onClick={close}
            className="w-10 h-10 rounded-full border border-gold/40 bg-[#0a0a0a]/80 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center px-16 pb-6 min-h-0"
        style={{
          transition: "transform 300ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease",
          transform: visible ? "scale(1)" : "scale(0.96)",
        }}
      >
        {/* Spinner while loading */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full border-2 border-gold/30 border-t-gold"
              style={{ animation: "spin 0.9s linear infinite" }}
            />
          </div>
        )}
        <img
          key={index}
          src={images[index].src}
          alt={images[index].label}
          onLoad={() => setLoaded(true)}
          className="max-w-full max-h-full object-contain rounded-2xl border border-gold/25 shadow-gold"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 300ms ease" }}
        />
      </div>

      {/* Label */}
      <div className="relative z-10 text-center pb-4 shrink-0">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/70">{images[index].label}</p>
      </div>

      {/* Prev / Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gold/40 bg-[#0a0a0a]/80 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gold/40 bg-[#0a0a0a]/80 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
