import { useEffect, useRef, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

/* ─── Inject cinematic logo keyframes once ─────────────────────── */
const LOGO_STYLE_ID = "logo-cinematic-styles";
function injectLogoStyles() {
  if (document.getElementById(LOGO_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = LOGO_STYLE_ID;
  style.textContent = `
    /* Letter-by-letter blur reveal */
    @keyframes letter-emerge {
      0%   { opacity: 0; filter: blur(8px); transform: translateY(5px) scale(0.90); }
      65%  { opacity: 1; filter: blur(0px); transform: translateY(-1px) scale(1.02); }
      100% { opacity: 1; filter: blur(0px); transform: translateY(0)    scale(1);    }
    }

    /* Periodic gold sweep every 5s — animates background-position on each letter */
    @keyframes gold-sweep-loop {
      0%, 70%   { background-position: -250% center; }
      88%, 100% { background-position:  250% center; }
    }

    /* Hover wrapper */
    .logo-wrapper {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
    }
    .logo-wrapper:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 16px rgba(212,175,55,0.95))
              drop-shadow(0 0 5px  rgba(212,175,55,0.55));
    }

    /* Text row */
    .logo-name {
      display: inline-block;
      line-height: 1;
      letter-spacing: 0.055em;
    }

    /* Each letter — gradient applied HERE so background-clip works */
    .logo-letter {
      display: inline-block;
      opacity: 0;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.20rem, 2.4vw, 1.70rem);

      /* Metallic gold gradient on the text itself */
      background: linear-gradient(
        105deg,
        #9a7a20  0%,
        #D4AF37 25%,
        #F9E27E 45%,
        #fffbe8 50%,
        #F9E27E 55%,
        #D4AF37 75%,
        #9a7a20 100%
      );
      background-size: 350% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;

      /* Layer 1: reveal; Layer 2: periodic shimmer (starts after all letters revealed) */
      animation:
        letter-emerge   0.55s cubic-bezier(0.22, 1, 0.36, 1) both,
        gold-sweep-loop 5s   linear 2s infinite;
    }
  `;
  document.head.appendChild(style);
}

/* ─── Letter-by-letter reveal text ──────────────────────────────── */
const BRAND_NAME = "Troupe Trabelsi";

function CinematicLogoText() {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      injectLogoStyles();
      mounted.current = true;
    }
  }, []);

  return (
    <span className="logo-name hidden xl:inline-block">
      {BRAND_NAME.split("").map((char, i) => (
        <span
          key={i}
          className="logo-letter"
          style={{
            // stagger: 0.06s per letter, start at 0.10s
            animationDelay: `${0.1 + i * 0.06}s`,
            // space character gets a fixed width
            ...(char === " " ? { width: "0.32em" } : {}),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* ─── Navbar logo ──────────────────────────────────────────────── */
function NavLogo() {
  return (
    <a href="/#accueil" className="logo-wrapper gap-3 select-none">
      {/* Brand image */}
      <img
        src="/trabelsilogo.png"
        alt="Troupe Trabelsi"
        style={{
          height: "44px",
          width: "44px",
          objectFit: "contain",
          filter: "drop-shadow(0 0 8px rgba(212,175,55,0.70))",
          flexShrink: 0,
        }}
      />
      {/* Cinematic letter-reveal text */}
      <CinematicLogoText />
    </a>
  );
}

const links = [
  { href: "/#accueil", label: "Accueil" },
  { href: "/#stars", label: "Nos Stars" },
  { href: "/#packs", label: "Packs" },
  { href: "/wedding-planner", label: "Wedding Planner" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<"joy" | "troupe">("troupe");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const brand = (e as CustomEvent<"joy" | "troupe">).detail;
      setActiveBrand(brand);
    };
    window.addEventListener("brandSwitch", handler);
    return () => window.removeEventListener("brandSwitch", handler);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full transition-all duration-500 z-[1000] ${
        scrolled || open
          ? "bg-[#050505]/95 backdrop-blur-xl border-b border-gold/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto max-w-[1500px] px-6 lg:px-10 flex items-center justify-between relative gap-8">
        {/* Logo - Stays left on all screens for better stability */}
        <div className="flex-shrink-0 z-[1001] min-w-max">
          <NavLogo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-end gap-6 xl:gap-9 ml-10 flex-1">
          {links.map((l) =>
            l.href === "/wedding-planner" ? (
              <a
                key={l.href}
                href={l.href}
                className="relative overflow-hidden whitespace-nowrap rounded-full px-5 py-2 bg-gradient-to-r from-[#b8860b] via-[#f5d76e] to-[#b8860b] text-black font-bold tracking-[0.12em] text-xs uppercase shadow-[0_0_18px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(245,215,110,0.65)] before:content-[''] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Wedding Planner
                </span>
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-foreground/70 hover:text-gold transition-colors relative group font-sans font-bold"
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ),
          )}
        </nav>

        {/* Hamburger - Always on top */}
        <button
          className="lg:hidden text-gold p-2 active:scale-90 transition-transform z-[1001] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 w-full h-screen bg-[#050505] z-[999] transition-all duration-500 lg:hidden flex flex-col items-center justify-center ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{
          backgroundColor: "#050505", // Solid fallback
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      >
        <nav className="flex w-full max-w-sm flex-col items-center gap-8 text-center px-6">
          {links.map((l, i) =>
            l.href === "/wedding-planner" ? (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="relative overflow-hidden whitespace-nowrap w-full rounded-full px-5 py-3 mt-3 bg-gradient-to-r from-[#b8860b] via-[#f5d76e] to-[#b8860b] bg-[length:200%_auto] animate-shimmer text-black font-bold uppercase tracking-[0.12em] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95 before:content-[''] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full"
                style={{
                  transitionDelay: open ? `${i * 70}ms` : "0ms",
                  opacity: open ? 1 : 0,
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Wedding Planner
                </span>
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl sm:text-3xl font-display uppercase tracking-[0.30em] text-white/90 hover:text-gold active:scale-95 transition-all"
                style={{
                  transitionDelay: open ? `${i * 70}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(30px)",
                }}
              >
                {l.label}
              </a>
            ),
          )}

          <div className="h-px w-20 bg-gold/30 mt-6" />

          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] text-gold/60 uppercase tracking-[0.45em] font-sans">
              Troupe Trabelsi
            </span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] text-white/30 uppercase tracking-[0.25em]">
                Tunisie · France · Dubai
              </span>
              <span className="text-[8px] text-white/20 uppercase tracking-[0.25em]">
                2025 · 2026 Edition
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
