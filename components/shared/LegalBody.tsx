export function LegalBody({ children }: { children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container-tight max-w-3xl">
        <div
          className="space-y-6 text-ink-muted leading-relaxed [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:text-brand-700 [&_a]:underline-offset-4 hover:[&_a]:underline"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
