export default function Divider({ symbol = "❦" }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-4 py-10 sm:gap-6"
    >
      <span className="h-px w-16 bg-ink-soft/20 dark:bg-cream/10 sm:w-28" />
      <span className="font-display text-2xl text-sage-deep dark:text-sage-light">
        {symbol}
      </span>
      <span className="h-px w-16 bg-ink-soft/20 dark:bg-cream/10 sm:w-28" />
    </div>
  );
}