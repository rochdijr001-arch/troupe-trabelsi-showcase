import { useEffect, useRef } from "react";
import { ArrowRight, Star } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Inject hero-specific keyframes once
───────────────────────────────────────────────────────────────── */
const HERO_STYLE_ID = "hero-anim-styles";
function injectHeroStyles() {
  if (document.getElementById(HERO_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = HERO_STYLE_ID;
  s.textContent = `
    @keyframes hero-fade-up {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes hero-scale-in {
      from { opacity: 0; transform: scale(0.96); }
      to   { opacity: 1; transform: scale(1);    }
    }
    @keyframes hero-badge {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0);     }
    }
    @keyframes scroll-bounce {
      0%, 100% { transform: translateX(-50%) translateY(0);   opacity: 0.6; }
      50%       { transform: translateX(-50%) translateY(8px); opacity: 1;   }
    }
    @keyframes gold-pulse {
      0%, 100% { box-shadow: 0 0 18px 3px rgba(212,175,55,0.35); }
      50%       { box-shadow: 0 0 36px 8px rgba(212,175,55,0.65); }
    }

    .hero-badge   { animation: hero-badge   0.8s cubic-bezier(0.22,1,0.36,1) 0.10s both; }
    .hero-title   { animation: hero-fade-up  1.0s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
    .hero-sub     { animation: hero-fade-up  1.0s cubic-bezier(0.22,1,0.36,1) 0.60s both; }
    .hero-cta     { animation: hero-fade-up  1.0s cubic-bezier(0.22,1,0.36,1) 0.85s both; }
    .hero-scroll  { animation: scroll-bounce 2.4s ease-in-out infinite; }

    .hero-btn-primary {
      background: linear-gradient(135deg,#9a7a20 0%,#D4AF37 35%,#f5d970 55%,#D4AF37 80%,#9a7a20 100%);
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
    }
    .hero-btn-primary:hover {
      transform: scale(1.04);
      box-shadow: 0 0 36px 8px rgba(212,175,55,0.45);
      animation: gold-pulse 2s ease-in-out infinite, shimmer 4s linear infinite;
    }
    .hero-btn-ghost {
      border: 1px solid rgba(212,175,55,0.55);
      color: #D4AF37;
      transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .hero-btn-ghost:hover {
      background: rgba(212,175,55,0.10);
      border-color: #D4AF37;
      transform: scale(1.04);
    }
  `;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    injectHeroStyles();
    // Force play on mobile (some browsers block autoplay)
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* ── Background video ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ objectFit: "cover" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay on top of video (opacity 0.62) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(0,0,0,0.50) 0%,rgba(0,0,0,0.62) 55%,rgba(0,0,0,0.82) 100%)",
        }}
      />

      {/* ── Radial gold ambient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%,rgba(212,175,55,0.08),transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">



        {/* Main title */}
        <h1
          className="hero-title font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.2] mb-8 text-white px-4 md:px-0"
        >
          La seule adresse pour que{" "}
          <br className="hidden md:block" />
          vos soirées de{" "}
          <em
            className="not-italic"
            style={{
              fontStyle: "italic",
              background:
                "linear-gradient(135deg,#9a7a20 0%,#D4AF37 30%,#f5d970 55%,#D4AF37 80%,#9a7a20 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
            }}
          >
            rêve
          </em>{" "}
          deviennent réalité
        </h1>

        {/* Subtitle */}
        <p
          className="hero-sub font-sans text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 px-6 md:px-0"
          style={{ color: "rgba(255,255,255,0.62)" }}
        >
          Troupe Trabelsi &amp; Joy Band — musiciens d'exception, spectacles
          époustouflants et mise en scène sur-mesure pour des cérémonies
          qui restent gravées dans les mémoires.
        </p>

        {/* CTA buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-8 md:px-0">
          <a
            href="#packs"
            className="hero-btn-primary inline-flex items-center justify-center gap-3 px-9 py-5 sm:py-4 rounded-full font-sans font-bold text-[13px] uppercase tracking-[0.22em] active:scale-95 transition-all"
            style={{ color: "#000" }}
          >
            Découvrir nos offres
            <ArrowRight size={17} />
          </a>

          <a
            href="#stars"
            className="hero-btn-ghost inline-flex items-center justify-center gap-3 px-9 py-5 sm:py-4 rounded-full font-sans font-semibold text-[13px] uppercase tracking-[0.22em] active:scale-95 transition-all"
          >
            Nos Stars
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="hero-scroll absolute bottom-10 left-1/2 z-10 flex flex-col items-center gap-2"
        style={{ transform: "translateX(-50%)" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.30em] font-sans"
          style={{ color: "rgba(212,175,55,0.45)" }}
        >
          Découvrir
        </span>
        <div
          className="w-px h-14"
          style={{
            background:
              "linear-gradient(180deg,rgba(212,175,55,0.70),transparent)",
          }}
        />
      </div>
    </section>
  );
}
