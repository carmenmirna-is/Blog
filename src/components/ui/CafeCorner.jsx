import { Coffee, BookOpen, Feather, Lamp } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Una pequeña "naturaleza muerta" decorativa —taza humeando, libro
 * abierto, pluma y lámpara— para usar en rincones puntuales del sitio
 * donde el tema de la cafetería/biblioteca merece un guiño visual.
 * Extremadamente discreta a propósito: baja opacidad, sin colores
 * llamativos, solo unos pocos íconos con líneas finas.
 */
export default function CafeCorner({ className = "" }) {
  return (
    <div className={`pointer-events-none flex items-end gap-3 opacity-40 dark:opacity-25 ${className}`} aria-hidden="true">
      <Lamp className="h-5 w-5 text-gold" strokeWidth={1.3} />
      <BookOpen className="h-6 w-6 text-wood" strokeWidth={1.3} />

      <div className="relative">
        <Coffee className="h-6 w-6 text-wood" strokeWidth={1.3} />
        {/* Vapor: dos líneas curvas que suben y se desvanecen, en loop lento */}
        <motion.span
          className="absolute -top-2.5 left-1 block h-2 w-px bg-ink-soft/40 dark:bg-cream/30"
          animate={{ opacity: [0, 0.6, 0], y: [0, -4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute -top-2.5 left-3 block h-2 w-px bg-ink-soft/40 dark:bg-cream/30"
          animate={{ opacity: [0, 0.6, 0], y: [0, -4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </div>

      <Feather className="h-5 w-5 text-sage-deep dark:text-sage-light" strokeWidth={1.3} />
    </div>
  );
}