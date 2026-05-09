import { Phone, Instagram, Mail, MapPin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-10 border-t border-gold/20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute inset-0 bg-radial-gold opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Contact</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            Réservez votre{" "}
            <span className="italic text-gradient-gold">soirée d'exception</span>
          </h2>
          <p className="text-foreground/70 text-lg">
            Notre équipe vous répond personnellement sous 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          <ContactCard icon={Phone} title="Appelez-nous" lines={["+216 24 739 679", "+216 22 751 841"]} />
          <ContactCard icon={Instagram} title="Instagram" lines={["@troupetrabelsi"]} href="https://instagram.com/troupetrabelsi" />
          <ContactCard icon={Facebook} title="Facebook" lines={["Troupe Trabelsi"]} href="https://www.facebook.com/Trabelsiweddingplanner/" />
          <ContactCard icon={MapPin} title="Notre Adresse" lines={["5035 Av. Habib Bourguiba", "Sayada"]} href="https://www.google.com/maps/place/Troupe+trabelsi+bureau/@35.6603266,10.8886582,17z/data=!3m1!4b1!4m6!3m5!1s0x13021700173476eb:0xe601debe495b341a!8m2!3d35.6603266!4d10.8912331!16s%2Fg%2F11lp7sdqjt?entry=ttu" />
        </div>

        <div className="gold-divider mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#accueil" className="font-display text-2xl text-gradient-gold animate-shimmer">
            Troupe Trabelsi
          </a>
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">
            © {new Date().getFullYear()} Troupe Trabelsi · Luxury Wedding Agency
          </p>
          <div className="flex items-center gap-3">
            <SocialLink href="tel:+21624739679" icon={Phone} />
            <SocialLink href="https://instagram.com/troupetrabelsi" icon={Instagram} />
            <SocialLink href="https://www.facebook.com/Trabelsiweddingplanner/" icon={Facebook} />
            <SocialLink href="mailto:contact@troupetrabelsi.com" icon={Mail} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: typeof Phone;
  title: string;
  lines: string[];
  href?: string;
}) {
  const Inner = (
    <div className="group relative p-8 rounded-2xl border border-gold/20 bg-card/50 backdrop-blur hover:border-gold transition-all duration-500 hover:-translate-y-1 text-center h-full">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 bg-gold/5 mb-5 group-hover:bg-gradient-gold group-hover:border-transparent transition-all duration-500">
        <Icon size={22} className="text-gold group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="font-display text-xl mb-3 text-gold">{title}</h3>
      {lines.map((l) => (
        <p key={l} className="text-foreground/80 text-sm leading-relaxed">{l}</p>
      ))}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{Inner}</a>
  ) : Inner;
}

function SocialLink({ href, icon: Icon }: { href: string; icon: typeof Phone }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gradient-gold hover:text-primary-foreground hover:border-transparent transition-all duration-500"
    >
      <Icon size={16} />
    </a>
  );
}
