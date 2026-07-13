export default function PageHeader({ section }) {
  const Icon = section.icon;

  return (
    <section className="bg-sage/15 pt-36 pb-16 text-center">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-paper shadow-petal">
          <Icon className="h-6 w-6 text-sage-deep" strokeWidth={1.6} />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sage-deep">
          {section.tagline}
        </p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          {section.label}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          {section.description}
        </p>
      </div>
    </section>
  );
}