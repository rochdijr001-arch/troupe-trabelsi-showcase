import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";


/* ─────────────────────────────────────────────
   EVENT PHOTOS
   → Swap "/photo/..." paths to "/galerie/..."
     once your galerie folder is in public/
───────────────────────────────────────────── */
type GalleryImage = {
  src: string;
  span?: "tall" | "wide" | "normal";
};

const SPANS: GalleryImage["span"][] = ["tall", "normal", "normal", "normal", "tall", "normal", "normal", "wide", "normal", "tall"];
const MISSING_GALLERY_IMAGE_NUMBERS = [32, 39, 40, 45, 67];

const galleryImages: GalleryImage[] = Array.from({ length: 77 }, (_, i) => i + 1)
  .filter((imageNumber) => !MISSING_GALLERY_IMAGE_NUMBERS.includes(imageNumber))
  .map((imageNumber, index) => ({
    src: `/photo/image${String(imageNumber).padStart(5, "0")}.jpeg`,
    span: SPANS[index % SPANS.length],
  }));

const INITIAL_VISIBLE_IMAGES = 16;
const LOAD_MORE_IMAGES = 12;

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_IMAGES);
  const visibleImages = galleryImages.slice(0, visibleCount);
  const hasMoreImages = visibleCount < galleryImages.length;

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const showMoreImages = () =>
    setVisibleCount((count) => Math.min(count + LOAD_MORE_IMAGES, galleryImages.length));
  const goNext = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i + 1) % visibleImages.length)),
    [visibleImages.length],
  );
  const goPrev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? null : (i - 1 + visibleImages.length) % visibleImages.length,
      ),
    [visibleImages.length],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")      closeLightbox();
      if (e.key === "ArrowRight")  goNext();
      if (e.key === "ArrowLeft")   goPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightboxIdx, closeLightbox, goNext, goPrev]);

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


        {/* ── Stats bar ── */}
        <div className="flex flex-wrap justify-center gap-14 mb-16">
          {[
            { value: "2000+",                      label: "Soirées réalisées"   },
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
          {visibleImages.map((img, idx) => (
            <GalleryTile
              key={img.src}
              img={img}
              idx={idx}
              total={visibleImages.length}
              onOpen={() => openLightbox(idx)}
            />
          ))}
        </div>

        {hasMoreImages && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={showMoreImages}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-gold/45 bg-black/50 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-gold shadow-gold transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold hover:bg-gold/10 active:scale-95"
            >
              Voir plus de photos
              <ImageIcon size={14} />
            </button>
          </div>
        )}

        {/* ── Bottom tag ── */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-full border border-gold/30 bg-gold/5">
            <ImageIcon size={13} className="text-gold shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold">
              Galerie · Troupe Trabelsi
            </span>
            <ImageIcon size={13} className="text-gold shrink-0" />
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={visibleImages}
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
      aria-label={`Voir photo ${idx + 1} sur ${total}`}
      onKeyDown={e => e.key === "Enter" && onOpen()}
      style={{ animationDelay: `${(idx % 8) * 0.06}s` }}
    >
      <img
        src={img.src}
        alt={`Photo ${idx + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
      />

      {/* Gold overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

      {/* Gold border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px #D4AF37" }}
      />

      {/* Centre icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
        <div className="w-12 h-12 rounded-full border-2 border-gold/70 bg-[#0a0a0a]/60 backdrop-blur flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
          <ZoomIn size={18} className="text-gold" />
        </div>
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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 10); return () => clearTimeout(t); }, []);
  useEffect(() => { setLoaded(false); }, [index]);

  const close = () => { setVisible(false); setTimeout(onClose, 300); };
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartX.current = touch?.clientX ?? null;
    touchStartY.current = touch?.clientY ?? null;
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];

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
      className="fixed inset-0 z-[9999] flex h-[100dvh] flex-col transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={close}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(4,4,4,0.96)] backdrop-blur-md md:backdrop-blur-2xl"
      />

      <button
        onClick={(e) => { e.stopPropagation(); close(); }}
        aria-label="Fermer la galerie"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10010] w-11 h-11 rounded-full border border-gold/40 bg-[#0a0a0a]/85 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300 ease-out"
      >
        <X size={18} />
      </button>

      {/* Top bar */}
      <div
        className="relative z-[10000] flex items-center justify-between px-4 sm:px-6 pb-4 shrink-0 pr-20"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-3">
          <ImageIcon size={14} className="text-gold" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Troupe Trabelsi · Galerie</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs tracking-widest text-foreground/40">{index + 1} / {images.length}</span>
        </div>
      </div>

      {/* Image area */}
      <div
        className="relative z-[10000] flex-1 flex items-center justify-center px-4 sm:px-16 pb-6 min-h-0"
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
        <div
          className="relative flex max-w-full max-h-[78dvh] md:max-h-[84dvh] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={index}
            src={images[index].src}
            alt={`Photo ${index + 1}`}
            onLoad={() => setLoaded(true)}
            decoding="async"
            className="max-w-full max-h-[78dvh] md:max-h-[84dvh] object-contain rounded-2xl border border-gold/25 shadow-gold select-none"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 300ms ease" }}
            draggable={false}
          />
        </div>
      </div>



      {/* Prev / Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[10010] w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/40 bg-[#0a0a0a]/80 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300 ease-out"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[10010] w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/40 bg-[#0a0a0a]/80 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300 ease-out"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
