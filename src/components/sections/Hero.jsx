import { motion } from "framer-motion";
import { ChevronDown, Coffee, BookOpen, Sprout, Flame, Sparkle, Moon } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

// Luciérnagas: cada una con su propio tamaño, desenfoque y brillo,
// para que no se vean idénticas ni en un patrón regular.
const fireflies = [
  { left: "8%", top: "20%", size: 5, blur: 0, opacity: 0.9, duration: 5 },
  { left: "15%", top: "65%", size: 2, blur: 1, opacity: 0.4, duration: 7 },
  { left: "22%", top: "40%", size: 3, blur: 0, opacity: 0.7, duration: 6 },
  { left: "30%", top: "12%", size: 2, blur: 2, opacity: 0.3, duration: 8 },
  { left: "38%", top: "78%", size: 4, blur: 0, opacity: 0.8, duration: 5.5 },
  { left: "45%", top: "30%", size: 2, blur: 1, opacity: 0.35, duration: 9 },
  { left: "60%", top: "15%", size: 3, blur: 0, opacity: 0.6, duration: 6.5 },
  { left: "68%", top: "55%", size: 5, blur: 0, opacity: 0.9, duration: 4.5 },
  { left: "75%", top: "25%", size: 2, blur: 2, opacity: 0.3, duration: 8.5 },
  { left: "82%", top: "70%", size: 3, blur: 0, opacity: 0.7, duration: 6 },
  { left: "90%", top: "35%", size: 2, blur: 1, opacity: 0.4, duration: 7.5 },
  { left: "5%", top: "85%", size: 4, blur: 0, opacity: 0.75, duration: 5 },
  { left: "55%", top: "88%", size: 2, blur: 1.5, opacity: 0.3, duration: 9 },
  { left: "95%", top: "10%", size: 3, blur: 0, opacity: 0.65, duration: 6.2 },
];

// Estrellas fijas para el modo oscuro — pequeños puntos casi estáticos,
// a diferencia de las luciérnagas que sí se mueven.
const stars = [
  { left: "12%", top: "8%", size: 2 },
  { left: "28%", top: "18%", size: 1.5 },
  { left: "50%", top: "6%", size: 2 },
  { left: "65%", top: "12%", size: 1.5 },
  { left: "80%", top: "20%", size: 2 },
  { left: "92%", top: "8%", size: 1.5 },
];

// Ramas/hojas muy discretas en las esquinas del Hero —
// puro adorno atmosférico, casi invisible.
function CornerBranch({ className }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 2 Q 30 20, 40 50 Q 50 80, 80 90"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="40" cy="50" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="60" cy="68" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="80" cy="90" r="3" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-forest via-sage-deep to-forest dark:from-night dark:via-forest dark:to-night"
      aria-label="Bienvenida"
    >
      {/* Manchas de acuarela, tipo bokeh */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-rose/25 blur-3xl dark:bg-lavender/10" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-lavender/20 blur-3xl dark:bg-sage-deep/15" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-sage-light/20 blur-3xl dark:bg-forest/20" />
      </div>

      {/* Luna, solo visible en modo oscuro */}
      <div className="pointer-events-none absolute right-16 top-16 hidden opacity-90 dark:block">
        <Moon className="h-10 w-10 text-cream/80" strokeWidth={1} fill="currentColor" />
      </div>

      {/* Estrellas, solo modo oscuro */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden dark:block">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cream"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Luciérnagas, en ambos modos (más notorias de noche por contraste) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {fireflies.map((f, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              filter: f.blur ? `blur(${f.blur}px)` : "none",
            }}
            animate={{ opacity: [f.opacity * 0.2, f.opacity, f.opacity * 0.2], y: [0, -14, 0] }}
            transition={{ duration: f.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          />
        ))}
      </div>

      {/* Ramas discretas en las esquinas */}
      <CornerBranch className="pointer-events-none absolute -left-2 -top-2 h-24 w-24 text-cream/40 dark:text-cream/25" />
      <CornerBranch className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 rotate-90 text-cream/40 dark:text-cream/25" />

      <Container className="relative z-10 flex flex-col items-center py-32 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-cream/90"
        >
          <Sparkle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          Biblioteca · Cafetería · Bosque
        </motion.span>

        {/* ===== LA VENTANA ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 h-[280px] w-[260px] sm:h-[340px] sm:w-[320px]"
        >
          {/* Marco de madera clara — doble borde para dar sensación de talla */}
          <div className="absolute inset-0 rounded-t-full border-[10px] border-beige shadow-petal-lg dark:border-wood" />
          <div className="absolute inset-[6px] overflow-hidden rounded-t-full border-2 border-wood/40 dark:border-cream/10">

            {/* Cielo de fondo dentro de la ventana */}
            <div className="absolute inset-0 bg-gradient-to-b from-lavender-light/60 via-rose-light/30 to-sage/30 dark:from-night dark:via-forest/80 dark:to-forest" />

            {/* Rayos de luz — solo modo claro, sensación de mañana */}
            <div
              aria-hidden="true"
              className="absolute -top-10 left-1/4 h-72 w-24 rotate-12 bg-gradient-to-b from-gold/40 via-gold/10 to-transparent blur-md dark:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute -top-10 left-1/2 h-72 w-16 rotate-6 bg-gradient-to-b from-cream/40 via-cream/10 to-transparent blur-md dark:hidden"
            />

            {/* Luz cálida interior — solo modo oscuro, como si viniera de la cafetería */}
            <div
              aria-hidden="true"
              className="absolute bottom-14 left-1/2 hidden h-24 w-40 -translate-x-1/2 rounded-full bg-gold/25 blur-2xl dark:block"
            />

            {/* "Bosque" desenfocado detrás del cristal — manchas acuareladas */}
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute -left-8 bottom-10 h-40 w-32 rounded-full bg-forest/50 blur-md dark:bg-forest/70" />
              <div className="absolute left-6 bottom-6 h-52 w-28 rounded-full bg-sage-deep/60 blur-sm dark:bg-sage-deep/50" />
              <div className="absolute right-2 bottom-8 h-48 w-36 rounded-full bg-forest/45 blur-md dark:bg-forest/70" />
              <div className="absolute right-10 bottom-4 h-36 w-24 rounded-full bg-sage-deep/55 blur-sm dark:bg-sage-deep/50" />
            </div>

            {/* Niebla ligera, solo modo oscuro */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-16 hidden h-10 bg-cream/10 blur-lg dark:block"
            />

            {/* Reflejo del cristal — una franja diagonal muy sutil */}
            <div
              aria-hidden="true"
              className="absolute -left-10 top-0 h-full w-16 -rotate-12 bg-gradient-to-r from-transparent via-cream/15 to-transparent"
            />

            {/* Alféizar de madera */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-wood-deep/85" />
            <div className="absolute inset-x-0 bottom-16 h-1.5 bg-wood-deep/95" />

            {/* Pequeña naturaleza muerta sobre el alféizar */}
            <div className="absolute inset-x-0 bottom-4 flex items-end justify-center gap-4">
              <BookOpen className="h-7 w-7 text-cream/85 drop-shadow" strokeWidth={1.4} aria-hidden="true" />
              <Sprout className="h-6 w-6 text-sage-light drop-shadow" strokeWidth={1.4} aria-hidden="true" />
              <Coffee className="h-6 w-6 text-cream/90 drop-shadow" strokeWidth={1.4} aria-hidden="true" />
              <Flame className="h-5 w-5 text-gold drop-shadow" strokeWidth={1.4} aria-hidden="true" />
            </div>

            <div className="absolute inset-0 ring-1 ring-inset ring-cream/20" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-2xl font-display text-4xl font-medium italic leading-tight text-cream sm:text-5xl md:text-6xl"
        >
          Un rincón donde el tiempo <br className="hidden sm:block" />
          se sirve con calma
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          Una pequeña biblioteca escondida dentro de una cafetería, rodeada de
          bosque. Libros, ideas, código, café y algunos poemas — todo servido
          despacio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            as="a"
            href="#explorar"
            variant="primary"
            size="lg"
            className="bg-gold text-wood-deep hover:bg-gold/90"
          >
            Entrar al rincón
          </Button>
          <Button as="a" href="/sobre-mi" variant="secondary" size="lg" className="border-cream/40 text-cream hover:bg-cream/10">
            Conóceme
          </Button>
        </motion.div>
      </Container>

      <motion.a
        href="#explorar"
        aria-label="Bajar a las secciones"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}