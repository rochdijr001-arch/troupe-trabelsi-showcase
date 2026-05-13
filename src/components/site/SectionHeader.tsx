export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-flex items-center gap-3 mb-5">
        <span className="w-8 h-px bg-gold" />
        <span className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
        <span className="w-8 h-px bg-gold" />
      </div>
      <h2 className="font-display text-2xl sm:text-4xl md:text-6xl mb-5">
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </h2>
      {subtitle && (
        <p className="text-foreground/60 text-sm sm:text-lg leading-relaxed px-2 sm:px-0">{subtitle}</p>
      )}
    </div>
  );
}
