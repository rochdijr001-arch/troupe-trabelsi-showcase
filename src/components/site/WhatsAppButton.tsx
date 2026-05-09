import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [activeBrand, setActiveBrand] = useState<"joy" | "troupe">("troupe");
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Phone number
  const phoneNumber = "21624739679";

  // Dynamic message based on active brand
  const getMessage = () => {
    if (activeBrand === "joy") {
      return encodeURIComponent("Bonjour Joy Band, je souhaite réserver un pack pour mon événement.");
    }
    return encodeURIComponent("Bonjour Troupe Trabelsi, je souhaite avoir plus de détails sur vos prestations.");
  };

  useEffect(() => {
    // Reveal button after a short delay for scale-in effect
    const timer = setTimeout(() => setVisible(true), 1500);

    // Listen for brand switch events dispatched by Packs section
    const handler = (e: Event) => {
      const brand = (e as CustomEvent<"joy" | "troupe">).detail;
      setActiveBrand(brand);
    };
    window.addEventListener("brandSwitch", handler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("brandSwitch", handler);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-700 ${
        visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-4 px-4 py-2 rounded-lg bg-black/90 border border-gold/30 text-gold text-[11px] uppercase tracking-[0.2em] font-sans font-bold whitespace-nowrap transition-all duration-300 pointer-events-none ${
          showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ boxShadow: "0 4px 20px rgba(212,175,55,0.25)" }}
      >
        Réserver maintenant
      </div>

      {/* Floating Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${getMessage()}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-black border border-gold/40 transition-all duration-500 hover:scale-110 active:scale-90"
        style={{
          boxShadow: "0 0 20px rgba(212,175,55,0.15)",
        }}
      >
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-gold" />
        
        {/* Glow behind icon */}
        <div className="absolute inset-0 rounded-full group-hover:bg-gold/10 transition-colors duration-500" />

        {/* WhatsApp Icon (Lucide MessageCircle) styled as Gold */}
        <MessageCircle 
          size={32} 
          className="text-gold transition-transform duration-500 group-hover:rotate-12" 
          strokeWidth={1.5}
        />
        
        {/* Inner shadow/glow for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_12px_rgba(212,175,55,0.2)]" />
      </a>
      
      {/* Small mobile adjustment for padding */}
      <style>{`
        @media (max-width: 768px) {
          .fixed.bottom-8.right-8 {
            bottom: 30px;
            right: 25px;
          }
        }
      `}</style>
    </div>
  );
}
