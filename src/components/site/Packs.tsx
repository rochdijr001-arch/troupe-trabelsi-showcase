import { useState, useRef, useEffect } from "react";
import { Check, Play } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════ */
const GOLD = "#D4AF37";
const GOLD_GRAD = "linear-gradient(135deg,#9a7a20 0%,#D4AF37 30%,#f5d970 55%,#D4AF37 80%,#9a7a20 100%)";
const GOLD_GLOW = "0 0 30px 6px rgba(212,175,55,0.45), 0 0 60px 12px rgba(212,175,55,0.15)";

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */
type TierKey = "bronze" | "silver" | "gold" | "diamant";
type TabId   = "joy"    | "troupe";

interface Pack {
  tier: TierKey;
  name: string;
  price: string;
  tagline: string;
  badge: string | null;
  features: string[];
}

interface VideoItem {
  id: string;
  label: string;
  thumb: string;
  src: string | null;
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const JOY_VIDEOS: VideoItem[] = [
  { id: "A1", label: "Joy Band · Live Show", thumb: "/photo/image00001.jpeg", src: "/video/joybandvid/A1.mp4" },
  { id: "A2", label: "Joy Band · Spectacle Nouba", thumb: "/photo/image00002.jpeg", src: "/video/joybandvid/A2.mp4" },
  { id: "A3", label: "Joy Band · Spectacle Hadra",  thumb: "/photo/image00003.jpeg", src: "/video/joybandvid/A3.mp4" },
  { id: "A4", label: "Joy Band · Dabka Souriya",   thumb: "/photo/image00004.jpeg", src: "/video/joybandvid/A4.mp4" },
];

const TROUPE_VIDEOS: VideoItem[] = [
  { id: "B1", label: "Trabelsi · Grand Orchestre", thumb: "/photo/image00005.jpeg", src: "/video/trabelsivid/b1.mp4" },
  { id: "B2", label: "Trabelsi · Dabka Souriya",   thumb: "/photo/image00006.jpeg", src: "/video/trabelsivid/b2.mp4" },
  { id: "B3", label: "Trabelsi · Spectacle Nouba", thumb: "/photo/image00007.jpeg", src: "/video/trabelsivid/b3.mp4" },
  { id: "B4", label: "Trabelsi · Spectacle Hadra", thumb: "/photo/image00008.jpeg", src: "/video/trabelsivid/b4.mp4" },
];

const JOY_PACKS: Pack[] = [
  {
    tier: "bronze", name: "BRONZE", price: "3 500 DT",
    tagline: "L'énergie d'un live band", badge: null,
    features: ["Joy live band","07 musiciens","02 chanteurs","Intro violoniste","Décoration lumière"],
  },
  {
    tier: "silver", name: "SILVER", price: "4 000 DT",
    tagline: "Une nuit d'exception", badge: null,
    features: ["Joy live band","07 musiciens","03 chanteurs","Intro violoniste","Spectacle Nouba","Spectacle Hadhra","Décoration lumière"],
  },
  {
    tier: "gold", name: "GOLD", price: "4 600 DT",
    tagline: "Le plus populaire", badge: "LE PLUS CHOISI",
    features: ["Joy live band","07 musiciens","03 chanteurs","Intro violoniste","Spectacle Nouba","Spectacle Hadhra","Spectacle Ziara","Décoration lumière"],
  },
  {
    tier: "diamant", name: "DIAMANT", price: "5 200 DT",
    tagline: "L'expérience absolue", badge: null,
    features: ["Joy live band","07 musiciens","03 chanteurs","Intro violoniste","Dabka Souriya","Spectacle Nouba","Spectacle Hadhra","Spectacle Ziara","Décoration lumière"],
  },
];

const TROUPE_PACKS: Pack[] = [
  {
    tier: "bronze", name: "BRONZE", price: "4 500 DT",
    tagline: "L'excellence musicale", badge: null,
    features: ["13 musiciens","03 chanteurs","Intro mp3","Spectacle Nouba","Spectacle Hadhra","Décoration lumière"],
  },
  {
    tier: "silver", name: "SILVER", price: "5 200 DT",
    tagline: "Une nuit d'exception", badge: null,
    features: ["13 musiciens","03 chanteurs","Intro violoniste","Dabka Souriya","Spectacle Hadhra","Décoration lumière"],
  },
  {
    tier: "gold", name: "GOLD", price: "5 500 DT",
    tagline: "Le plus demandé", badge: "LE PLUS CHOISI",
    features: ["13 musiciens","03 chanteurs","Intro violoniste","Spectacle Nouba","Spectacle Hadhra","Spectacle Ziyara","Décoration lumière"],
  },
  {
    tier: "diamant", name: "DIAMANT", price: "6 500 DT",
    tagline: "L'expérience absolue", badge: "EXCLUSIF",
    features: ["13 musiciens","03 chanteurs","Intro violoniste","Dabka Souriya","Spectacle Nouba","Spectacle Hadhra","Spectacle Ziyara","Décoration lumière","Etincelle","Partie DJ","Extra : Voiture de luxe (600 DT)","Extra : Cortège & Salle de fête","Extra : Shooting (200 DT)"],
  },
];

/* ═══════════════════════════════════════════════════════════════
   TIER VISUAL TOKENS
═══════════════════════════════════════════════════════════════ */
const TIERS: Record<TierKey, { grad: string; headerGrad: string; border: string; glow: string }> = {
  bronze: {
    grad:       "linear-gradient(135deg,#cd7f32 0%,#f0a84a 45%,#cd7f32 100%)",
    headerGrad: "linear-gradient(160deg,rgba(205,127,50,0.18) 0%,transparent 70%)",
    border:     "rgba(205,127,50,0.45)", glow: "none",
  },
  silver: {
    grad:       "linear-gradient(135deg,#b0b0b0 0%,#e8e8e8 45%,#b0b0b0 100%)",
    headerGrad: "linear-gradient(160deg,rgba(192,192,192,0.18) 0%,transparent 70%)",
    border:     "rgba(192,192,192,0.40)", glow: "none",
  },
  gold: {
    grad:       `linear-gradient(135deg,${GOLD} 0%,#f5d970 45%,${GOLD} 100%)`,
    headerGrad: "linear-gradient(160deg,rgba(212,175,55,0.26) 0%,transparent 70%)",
    border:     GOLD,
    glow:       `0 0 36px 6px rgba(212,175,55,0.32),0 0 0 1px ${GOLD}`,
  },
  diamant: {
    grad:       `linear-gradient(135deg,${GOLD} 0%,#f8eaaa 35%,#b04cde 65%,${GOLD} 100%)`,
    headerGrad: "linear-gradient(160deg,rgba(176,76,222,0.22) 0%,rgba(212,175,55,0.18) 100%)",
    border:     GOLD,
    glow:       "0 0 44px 10px rgba(212,175,55,0.38),0 0 0 1px #D4AF37",
  },
};

/* ═══════════════════════════════════════════════════════════════
   SWITCHER BUTTON
═══════════════════════════════════════════════════════════════ */
function SwitcherBtn({
  id, isActive, logoSrc, label, sub, onClick,
}: {
  id: TabId; isActive: boolean; logoSrc: string;
  label: string; sub: string; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  return (
    <button
      id={`switcher-${id}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-6 rounded-2xl transition-all duration-500 focus-visible:outline-none"
      style={{
        background: isActive
          ? "linear-gradient(160deg,rgba(212,175,55,0.12) 0%,rgba(212,175,55,0.04) 100%)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${isActive ? GOLD : "rgba(212,175,55,0.18)"}`,
        boxShadow: isActive ? GOLD_GLOW : "none",
        minWidth: "140px",
        cursor: "pointer",
      }}
    >
      {/* Logo with hover glow */}
      <div
        style={{
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
          transform: active ? "scale(1.08)" : "scale(1)",
          filter: active
            ? "drop-shadow(0 0 14px rgba(212,175,55,0.90)) drop-shadow(0 0 28px rgba(212,175,55,0.40))"
            : "drop-shadow(0 0 4px rgba(212,175,55,0.30))",
        }}
      >
        <img
          src={logoSrc}
          alt={label}
          style={{ width: "56px", height: "56px", objectFit: "contain" }}
        />
      </div>

      {/* Label */}
      <div className="text-center">
        {isActive ? (
          <span
            className="block text-sm uppercase tracking-[0.26em] font-bold font-sans"
            style={{
              background: GOLD_GRAD,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            {label}
          </span>
        ) : (
          <span
            className="block text-sm uppercase tracking-[0.26em] font-bold font-sans"
            style={{ color: "rgba(212,175,55,0.60)" }}
          >
            {label}
          </span>
        )}
        <span
          className="block text-[10px] mt-0.5 font-sans tracking-widest"
          style={{ color: "rgba(212,175,55,0.35)" }}
        >
          {sub}
        </span>
      </div>

      {/* Active bottom indicator */}
      {isActive && (
        <span
          className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-3/4 rounded-full"
          style={{ background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HERO LOGO (large, centred, animated)
═══════════════════════════════════════════════════════════════ */
function SectionLogo({ brand, visible }: { brand: TabId; visible: boolean }) {
  const src   = brand === "joy" ? "/joybandlogo.png" : "/trabelsilogo.png";
  const label = brand === "joy" ? "Joy Band"          : "Troupe Trabelsi";

  return (
    <div
      className="flex flex-col items-center gap-3 my-10"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(12px)",
        transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          height: "110px",
          objectFit: "contain",
          filter:
            "drop-shadow(0 0 18px rgba(212,175,55,0.80)) drop-shadow(0 0 40px rgba(212,175,55,0.30))",
        }}
      />
      <span
        className="text-[10px] uppercase tracking-[0.40em] font-sans"
        style={{ color: "rgba(212,175,55,0.45)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GOLD DIVIDER
═══════════════════════════════════════════════════════════════ */
function GoldDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 justify-center my-8">
      <div className="h-px flex-1 max-w-[120px]"
        style={{ background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
      <span className="text-[10px] uppercase tracking-[0.38em] font-sans"
        style={{ color: "rgba(212,175,55,0.50)" }}>
        {label}
      </span>
      <div className="h-px flex-1 max-w-[120px]"
        style={{ background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIDEO CARD
═══════════════════════════════════════════════════════════════ */
function VideoCard({ video, isPlaying, onPlay, onStop }: { video: VideoItem; isPlaying: boolean; onPlay: () => void; onStop: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Sync play/pause with external isPlaying prop
  useEffect(() => {
    if (!ref.current || !video.src) return;
    if (isPlaying) {
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [isPlaying, video.src]);

  const toggle = () => {
    if (!video.src) return;
    if (isPlaying) {
      onStop();
    } else {
      onPlay();
    }
  };

  const handleEnded = () => onStop();

  return (
    <div
      className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer select-none"
      style={{
        border: `1px solid ${isPlaying ? GOLD : "rgba(212,175,55,0.35)"}`,
        boxShadow: isPlaying ? "0 0 28px 6px rgba(212,175,55,0.30)" : "none",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
        background: "#0a0a0a",
      }}
      onClick={toggle}
      onMouseEnter={(e) => {
        if (!isPlaying) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px 4px rgba(212,175,55,0.28)";
          (e.currentTarget as HTMLDivElement).style.borderColor = GOLD;
        }
      }}
      onMouseLeave={(e) => {
        if (!isPlaying) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.35)";
        }
      }}
    >
      {/* Video — always rendered; first frame shows as natural thumbnail via preload=metadata */}
      {video.src && (
        <video
          ref={ref}
          src={video.src}
          preload="metadata"
          onEnded={handleEnded}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark gradient overlay — fades out while playing */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg,rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.60) 100%)",
          opacity: isPlaying ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Centre play button — hidden while playing */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{
          opacity: isPlaying ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: isPlaying ? "none" : "auto",
        }}
      >
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "rgba(0,0,0,0.65)",
            border: `1.5px solid ${GOLD}`,
            boxShadow: "0 0 22px rgba(212,175,55,0.45)",
          }}
        >
          <Play size={20} style={{ color: GOLD, fill: GOLD, marginLeft: "3px" }} />
        </div>
        <span
          className="text-[10px] uppercase tracking-[0.20em] font-sans px-3 py-1 rounded-full"
          style={{ color: GOLD, background: "rgba(0,0,0,0.55)", border: "1px solid rgba(212,175,55,0.22)" }}
        >
          {video.label}
        </span>
      </div>

      {/* Control bar while playing */}
      {isPlaying && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-10"
          style={{ background: "linear-gradient(0deg,rgba(0,0,0,0.85) 0%,transparent 100%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-sans truncate mr-3"
            style={{ color: "rgba(212,175,55,0.80)" }}
          >
            {video.label}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); toggle(); }}
            className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.60)", border: `1.5px solid ${GOLD}`, boxShadow: "0 0 12px rgba(212,175,55,0.40)" }}
            aria-label="Pause"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="4" height="12" rx="1.2" fill={GOLD} />
              <rect x="8" y="1" width="4" height="12" rx="1.2" fill={GOLD} />
            </svg>
          </button>
        </div>
      )}

      {/* ID badge */}
      <span
        className="absolute top-3 right-3 text-[9px] font-bold font-sans px-2 py-0.5 rounded-full"
        style={{ background: GOLD_GRAD, backgroundSize: "200% auto", color: "#000" }}
      >
        {video.id}
      </span>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   PACK CARD
═══════════════════════════════════════════════════════════════ */
function PackCard({ pack, brand }: { pack: Pack; brand: TabId }) {
  const tk   = TIERS[pack.tier];
  const isHL = pack.badge !== null;
  const isJoy = brand === "joy";

  return (
    <article
      className="relative flex flex-col rounded-2xl transition-all duration-500 hover:-translate-y-2"
      style={{
        backgroundColor: "#080808",
        border: `1px solid ${tk.border}`,
        boxShadow: isHL ? tk.glow : "none",
      }}
    >
      {/* Badge */}
      {pack.badge && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.26em] font-bold font-sans whitespace-nowrap"
          style={{
            background: tk.grad, backgroundSize: "200% auto", color: "#000",
            animation: "shimmer 4s linear infinite",
            boxShadow: "0 0 22px 4px rgba(212,175,55,0.55)",
          }}
        >
          ✦ {pack.badge} ✦
        </div>
      )}

      {/* Card Header */}
      <div
        className="relative rounded-t-2xl px-6 pt-9 pb-5 overflow-hidden"
        style={{ background: tk.headerGrad }}
      >
        {/* Watermark logo */}
        <img
          src={isJoy ? "/joybandlogo.png" : "/trabelsilogo.png"}
          alt=""
          aria-hidden
          className="absolute -right-2 -top-2 w-20 h-20 object-contain pointer-events-none select-none"
          style={{ opacity: 0.09, filter: "drop-shadow(0 0 6px #D4AF37)" }}
        />

        <span
          className="inline-block px-3 py-0.5 rounded-full text-[10px] uppercase tracking-[0.20em] font-semibold mb-3 font-sans"
          style={{ background: tk.grad, backgroundSize: "200% auto", color: "#000" }}
        >
          {pack.name}
        </span>

        <h3
          className="font-display text-3xl font-bold mb-1"
          style={{
            background: tk.grad, backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          {pack.name}
        </h3>

        <p className="text-xs uppercase tracking-widest font-sans" style={{ color: "rgba(255,255,255,0.35)" }}>
          {pack.tagline}
        </p>
      </div>

      {/* Top separator */}
      <div className="mx-6 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${tk.border},transparent)`, opacity: 0.45 }} />

      {/* Features */}
      <ul className="flex-1 px-6 py-5 space-y-3">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[12.5px] font-sans">
            <span
              className="mt-0.5 shrink-0 w-[17px] h-[17px] rounded-full flex items-center justify-center"
              style={{ background: tk.grad, backgroundSize: "200% auto" }}
            >
              <Check size={9} color="#000" strokeWidth={3.5} />
            </span>
            <span style={{ color: "rgba(255,255,255,0.76)" }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* Bottom separator */}
      <div className="mx-6 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${tk.border},transparent)`, opacity: 0.35 }} />

      {/* Price + CTA */}
      <div className="px-6 pt-5 pb-6 text-center">
        <span className="block text-[9px] uppercase tracking-[0.28em] mb-1 font-sans"
          style={{ color: "rgba(255,255,255,0.30)" }}>
          À partir de
        </span>
        <span
          className="block font-display text-[1.8rem] sm:text-[2.4rem] font-bold leading-tight"
          style={{
            background: tk.grad, backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            animation: isHL ? "shimmer 4s linear infinite" : undefined,
          }}
        >
          {pack.price}
        </span>
        <a
          href="#contact"
          className="mt-4 block py-3 rounded-full text-[11px] uppercase tracking-[0.24em] font-sans font-bold transition-all duration-500"
          style={
            isHL
              ? {
                  background: GOLD_GRAD, backgroundSize: "200% auto", color: "#000",
                  animation: "shimmer 4s linear infinite",
                  boxShadow: "0 4px 28px rgba(212,175,55,0.35)",
                }
              : { border: `1px solid ${tk.border}`, color: GOLD, background: "transparent" }
          }
        >
          Réserver
        </a>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PACKS SECTION
═══════════════════════════════════════════════════════════════ */
export function Packs() {
  const [active, setActive]   = useState<TabId>("troupe");
  const [visible, setVisible] = useState(true);
  
  // States for mobile slider pagination
  const [packIdx, setPackIdx] = useState(0);
  const [vidIdx, setVidIdx]  = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  const packSliderRef = useRef<HTMLDivElement>(null);
  const vidSliderRef  = useRef<HTMLDivElement>(null);

  // Broadcast brand change to Navbar
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("brandSwitch", { detail: active }));
  }, [active]);

  const switchTab = (id: TabId) => {
    if (id === active) return;
    setVisible(false);
    setTimeout(() => { 
      setActive(id); 
      setVisible(true);
      // Reset sliders on tab change
      setPackIdx(0);
      setVidIdx(0);
      setPlayingVideoId(null);
      if (packSliderRef.current) packSliderRef.current.scrollLeft = 0;
      if (vidSliderRef.current)  vidSliderRef.current.scrollLeft = 0;
    }, 380);
  };

  // Helper to handle scroll and update active dots
  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, setIdx: (i: number) => void) => {
    if (!ref.current) return;
    const scrollLeft = ref.current.scrollLeft;
    const width      = ref.current.offsetWidth;
    const idx        = Math.round(scrollLeft / width);
    setIdx(idx);
  };

  const videos = active === "joy" ? JOY_VIDEOS : TROUPE_VIDEOS;
  const packs  = active === "joy" ? JOY_PACKS  : TROUPE_PACKS;
  const brand  = active === "joy" ? "Joy Band"  : "Troupe Trabelsi";

  return (
    <section
      id="packs"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-96"
        style={{ background: "radial-gradient(ellipse 75% 55% at 50% 0%,rgba(212,175,55,0.09),transparent 80%)" }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Section heading ── */}
        <div className="text-center mb-14">

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 text-white">
            Une{" "}
            <em className="not-italic" style={{
              background: GOLD_GRAD, backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
            }}>
              expérience
            </em>{" "}
            légendaire
          </h2>
          <p className="max-w-lg mx-auto text-sm font-sans leading-relaxed px-4 md:px-0"
            style={{ color: "rgba(255,255,255,0.42)" }}>
            Deux ensembles d'exception, des formules sur-mesure pour sublimer chaque instant.
          </p>
        </div>

        {/* ══ PREMIUM SWITCHER BUTTONS ═══════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-4">
          <SwitcherBtn
            id="troupe"
            isActive={active === "troupe"}
            logoSrc="/trabelsilogo.png"
            label="TROUPE TRABELSI"
            sub="À partir de 4 500 DT"
            onClick={() => switchTab("troupe")}
          />

          {/* VS divider */}
          <div className="flex flex-col items-center gap-1 px-2">
            <div className="h-8 w-px sm:h-16"
              style={{ background: `linear-gradient(180deg,transparent,${GOLD},transparent)` }} />
            <span className="text-[10px] font-sans uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.35)" }}>ou</span>
            <div className="h-8 w-px sm:h-16"
              style={{ background: `linear-gradient(180deg,transparent,${GOLD},transparent)` }} />
          </div>

          <SwitcherBtn
            id="joy"
            isActive={active === "joy"}
            logoSrc="/joybandlogo.png"
            label="JOY BAND"
            sub="À partir de 3 500 DT"
            onClick={() => switchTab("joy")}
          />
        </div>

        {/* ══ ANIMATED CONTENT ══════════════════════════════════ */}
        <div
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.50s ease-in-out, transform 0.50s ease-in-out",
          }}
        >
          {/* ── Section hero logo ── */}
          <SectionLogo brand={active} visible={visible} />

          {/* ── Pricing Cards ── */}
          <GoldDivider label={`${brand} · Formules`} />

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {packs.map((p) => <PackCard key={p.name} pack={p} brand={active} />)}
          </div>

          {/* Mobile "Peek-a-boo" Slider */}
          <div className="md:hidden">
            <div 
              ref={packSliderRef}
              onScroll={() => handleScroll(packSliderRef, setPackIdx)}
              className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-[7.5vw] snap-x snap-mandatory scrollbar-hide scroll-smooth"
              style={{ scrollPadding: "0 7.5vw" }}
            >
              {packs.map((p, i) => (
                <div 
                  key={p.name} 
                  className="min-w-[85vw] snap-center transition-transform duration-500 active:scale-95"
                  style={{ transform: packIdx === i ? "scale(1)" : "scale(0.95)" }}
                >
                  <PackCard pack={p} brand={active} />
                </div>
              ))}
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-2">
              {packs.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${packIdx === i ? "w-6 bg-gold" : "w-1.5 bg-gold/30"}`} 
                />
              ))}
            </div>
            <p className="text-center text-[9px] mt-4 tracking-[0.2em] uppercase font-sans text-gold/20">
              ← Glissez pour voir les offres →
            </p>
          </div>

          {/* ── Video Grid ── */}
          <GoldDivider label={`${brand} · Vidéos`} />

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 gap-5 max-w-4xl mx-auto">
            {videos.map((v) => <VideoCard key={v.id} video={v} isPlaying={playingVideoId === v.id} onPlay={() => setPlayingVideoId(v.id)} onStop={() => setPlayingVideoId(null)} />)}
          </div>

          {/* Mobile "Peek-a-boo" Slider */}
          <div className="md:hidden">
            <div 
              ref={vidSliderRef}
              onScroll={() => handleScroll(vidSliderRef, setVidIdx)}
              className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-[7.5vw] snap-x snap-mandatory scrollbar-hide scroll-smooth"
              style={{ scrollPadding: "0 7.5vw" }}
            >
              {videos.map((v, i) => (
                <div 
                  key={v.id} 
                  className="min-w-[85vw] aspect-video snap-center transition-transform duration-500 active:scale-95"
                  style={{ transform: vidIdx === i ? "scale(1)" : "scale(0.95)" }}
                >
                  <VideoCard video={v} isPlaying={playingVideoId === v.id} onPlay={() => setPlayingVideoId(v.id)} onStop={() => setPlayingVideoId(null)} />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-2">
              {videos.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${vidIdx === i ? "w-6 bg-gold" : "w-1.5 bg-gold/30"}`} 
                />
              ))}
            </div>
          </div>

        </div>
        {/* ══ END ANIMATED CONTENT ══════════════════════════════ */}

      </div>
    </section>
  );
}
