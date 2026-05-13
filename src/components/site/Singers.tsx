import { useEffect, useState } from "react";
import { X, Music2, MapPin, Award, Star, Mic2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { singers, type Singer } from "./singersData";

/* ── Main Section ── */
export function Singers() {
  const [active, setActive] = useState<Singer | null>(null);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [active]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <section id="stars" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        
        {/* ── MANAGER SECTION ── */}
        <SectionHeader
          eyebrow="Direction Artistique"
          title={"<em class='italic text-gradient-gold'>Le Manager</em>"}
          subtitle="Visionnaire et garant de l'excellence artistique de chaque prestation."
        />
        <div className="flex justify-center mb-24">
          <div className="w-full max-w-[280px] sm:max-w-sm">
            {singers.length > 0 && (
              <SingerCard 
                singer={singers[0]} 
                index={0} 
                onOpen={() => setActive(singers[0])} 
              />
            )}
          </div>
        </div>

        {/* ── TOP 5: NOTRE STARS ── */}
        <SectionHeader
          eyebrow="Notre Sélection"
          title={"<em class='italic text-gradient-gold'>Nos Stars</em> D'Exception"}
          subtitle="Un casting de légendes de la musique tunisienne — des voix qui ont conquis Tunis."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1100px] mx-auto mb-24">
          {singers.slice(1, 7).map((singer, i) => (
            <SingerCard key={singer.id} singer={singer} index={i + 1} onOpen={() => setActive(singer)} />
          ))}
        </div>

        {/* ── MIDDLE: LES STARS TUNISIENNES ── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-xs uppercase tracking-[0.4em] text-gold/80">Découvrir plus</span>
            <span className="w-8 h-px bg-gold/50" />
          </div>
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl text-gradient-gold mb-6 uppercase tracking-wider">Les Stars Tunisiennes</h3>
          <p className="text-[#F4F4F4]/50 max-w-2xl mx-auto text-sm leading-relaxed px-4">
            La richesse et la diversité de notre patrimoine musical, portée par les voix les plus emblématiques de la scène contemporaine.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto mb-24">
          {singers.slice(7, -1).map((singer, i) => (
            <SingerCard key={singer.id} singer={singer} index={i + 7} onOpen={() => setActive(singer)} />
          ))}
        </div>

        {/* ── BOTTOM: NORDO ── */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-[280px] sm:max-w-sm">
            {singers.length > 0 && (
              <SingerCard 
                singer={singers[singers.length - 1]} 
                index={singers.length - 1} 
                onOpen={() => setActive(singers[singers.length - 1])} 
              />
            )}
          </div>
        </div>

      </div>
      {active && <SingerModal singer={active} onClose={() => setActive(null)} />}
    </section>
  );
}

/* ── Card ── */
function SingerCard({ singer, index, onOpen }: { singer: Singer; index: number; onOpen: () => void }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-gold/20 bg-card hover-lift cursor-pointer"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={onOpen}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={singer.images[0]}
          alt={singer.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold/50 bg-[#0a0a0a]/70 backdrop-blur">
        <Music2 size={8} className="text-gold sm:w-2.5 sm:h-2.5" />
        <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold">{singer.specialty.split(" · ")[0]}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-gold/70 mb-1">{singer.born}</p>
        <h3 className="font-display text-lg sm:text-xl text-[#F4F4F4] mb-1 leading-tight">{singer.name}</h3>
        <p className="text-[#F4F4F4]/50 text-[10px] sm:text-[11px] mb-3 line-clamp-1 italic">"{singer.hit}"</p>
        <div className="h-px bg-gradient-to-r from-gold via-gold/40 to-transparent w-8 group-hover:w-full transition-all duration-700 mb-3" />
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-gold/50 text-gold text-[10px] uppercase tracking-[0.25em] hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300 font-medium"
        >
          <Star size={10} fill="currentColor" />
          Découvrir le profil
        </button>
      </div>
    </div>
  );
}

/* ── Modal ── */
function SingerModal({ singer, onClose }: { singer: Singer; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const close = () => { setVisible(false); setTimeout(onClose, 320); };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-2 sm:p-4 md:p-8"
      style={{ transition: "opacity 320ms ease", opacity: visible ? 1 : 0 }}
      onClick={close}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(4,4,4,0.90)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      />
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-gold/40 shadow-gold"
        style={{
          background: "linear-gradient(160deg, #111009 0%, #0a0a08 100%)",
          transition: "transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease",
          transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/40 bg-[#0a0a0a]/80 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-[#0a0a0a] hover:border-transparent transition-all duration-300"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[560px]">

          {/* LEFT — Single photo, no arrows */}
          <div className="relative overflow-hidden rounded-tl-3xl rounded-tr-3xl lg:rounded-tr-none lg:rounded-bl-3xl" style={{ minHeight: "280px" }}>
            <img
              src={singer.images[0]}
              alt={singer.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a08]/60 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] via-[#0a0a08]/10 to-transparent lg:hidden" />
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold/50 bg-[#0a0a0a]/70 backdrop-blur max-w-[calc(100%-60px)] sm:max-w-none">
              <Mic2 size={11} className="text-gold shrink-0" />
              <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold truncate">{singer.specialty}</span>
            </div>
          </div>

          {/* RIGHT — Bio */}
          <div className="flex flex-col justify-between p-5 sm:p-8 md:p-10 lg:p-12">
            <div>
              <p className="text-[9px] uppercase tracking-[0.35em] text-gold mb-3">Artiste · Troupe Trabelsi</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-[#F4F4F4] leading-tight mb-2">{singer.name}</h2>
              <p className="text-[10px] text-gold/70 mb-4 italic">"{singer.hit}"</p>
              <div className="gold-divider w-20 mb-6" />
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-7">
                <div className="flex items-center gap-2 text-[#F4F4F4]/60 text-xs">
                  <MapPin size={11} className="text-gold shrink-0" />
                  <span>{singer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#F4F4F4]/60 text-xs">
                  <Award size={11} className="text-gold shrink-0" />
                  <span>{singer.experience}</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {singer.bio.map((p, i) => (
                  <p key={i} className="text-[#F4F4F4]/75 leading-relaxed text-sm">{p}</p>
                ))}
              </div>
            </div>
            <div>
              <div className="gold-divider mb-5" />
              <p className="text-[9px] uppercase tracking-[0.3em] text-gold mb-3">Registres musicaux</p>
              <div className="flex flex-wrap gap-2">
                {singer.styles.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-xs border border-gold/30 text-[#F4F4F4]/80 bg-gold/5">{s}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
