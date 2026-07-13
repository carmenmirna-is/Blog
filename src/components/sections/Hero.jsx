import { motion } from "framer-motion";

export default function Hero() {
  const fireflies = Array.from({ length: 12 });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-rose-light via-cream to-lavender-light">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-rose/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-lavender/20 blur-3xl" />
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-rose-light via-cream to-lavender-light dark:from-forest dark:via-sage-deep dark:to-forest"/>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {fireflies.map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-200"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-10 h-[280px] w-[260px] rounded-t-full border-4 border-white/20 bg-gradient-to-b from-lavender/30 via-sage/20 to-wood/40"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-2xl font-display text-4xl italic text-forest dark:text-cream sm:text-5xl"
        >
          Un rincón donde el tiempo se sirve con calma
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 max-w-xl text-ink-soft"
          className="mt-6 max-w-xl text-ink-soft dark:text-cream/75"
        >
          Una pequeña biblioteca escondida dentro de una cafetería, rodeada de bosque.
        </motion.p>
      </div>
    </section>
  );
}