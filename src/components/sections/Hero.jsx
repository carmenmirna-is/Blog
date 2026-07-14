import { motion } from "framer-motion";
import { ChevronDown, Coffee, BookOpen, Sprout, Flame, Sparkle } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

// Cada luciérnaga tiene su propio tamaño, desenfoque y brillo —
// así no se ven idénticas ni alineadas en un patrón matemático perfecto.
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

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-forest via-sage-deep to-forest"
      aria-label="Bienvenida"
    >
      {/* Watercolor bokeh blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-rose/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-lavender/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-sage-light/20 blur-3xl" />
      </div>

      {/* Luciérnagas, cada una distinta */}
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
            animate={{
              opacity: [f.opacity * 0.2, f.opacity, f.opacity * 0.2],
              y: [0, -14, 0],
            }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          />
        ))}
      </div>

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

        {/* Arco-ventana con la escena ilustrada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 h-[280px] w-[260px] overflow-hidden rounded-t-full border-4 border-beige/70 shadow-petal-lg sm:h-[340px] sm:w-[320px]"
        >
          {/* Cielo/fondo de la ventana, degradado suave */}
          <div className="absolute inset-0 bg-gradient-to-b from-lavender-light/50 via-rose-light/30 to-sage/30" />

          {/* "Bosque" al fondo, hecho de manchas difuminadas superpuestas —
              el truco de la acuarela: varias formas orgánicas semitransparentes,
              no un dibujo con líneas definidas */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute -left-8 bottom-10 h-40 w-32 rounded-full bg-forest/50 blur-md" />
            <div className="absolute left-6 bottom-6 h-52 w-28 rounded-full bg-sage-deep/60 blur-sm" />
            <div className="absolute right-2 bottom-8 h-48 w-36 rounded-full bg-forest/45 blur-md" />
            <div className="absolute right-10 bottom-4 h-36 w-24 rounded-full bg-sage-deep/55 blur-sm" />
            <div className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full bg-gold/25 blur-2xl" />
          </div>

          {/* Alféizar de la ventana */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-wood-deep/80" />
          <div className="absolute inset-x-0 bottom-16 h-1.5 bg-wood-deep/90" />

          {/* Los objetos sobre el alféizar, como una pequeña naturaleza muerta */}
          <div className="absolute inset-x-0 bottom-4 flex items-end justify-center gap-4">
            <BookOpen className="h-7 w-7 text-cream/85 drop-shadow" strokeWidth={1.4} aria-hidden="true" />
            <Sprout className="h-6 w-6 text-sage-light drop-shadow" strokeWidth={1.4} aria-hidden="true" />
            <Coffee className="h-6 w-6 text-cream/90 drop-shadow" strokeWidth={1.4} aria-hidden="true" />
            <Flame className="h-5 w-5 text-gold drop-shadow" strokeWidth={1.4} aria-hidden="true" />
          </div>

          <div className="absolute inset-0 ring-1 ring-inset ring-cream/20" />
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