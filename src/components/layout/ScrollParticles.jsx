import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Flower2, Sparkle } from "lucide-react";

// Los 3 "personajes" que pueden caer — reutilizamos íconos que ya tienes
const PARTICLE_TYPES = [
  { Icon: Leaf, className: "text-sage-deep dark:text-sage-light" },
  { Icon: Flower2, className: "text-rose dark:text-rose-light" },
  { Icon: Sparkle, className: "text-gold" },
];

const MAX_PARTICLES = 4; // nunca más de 4 al mismo tiempo en pantalla
const SCROLL_STEP = 500; // píxeles de scroll necesarios para que nazca una nueva

export default function ScrollParticles() {
  const [particles, setParticles] = useState([]);
  const lastSpawnScroll = useRef(0);
  const idCounter = useRef(0);

  const spawnParticle = useCallback(() => {
    setParticles((prev) => {
      if (prev.length >= MAX_PARTICLES) return prev;

      const type = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
      const particle = {
        id: idCounter.current++,
        type,
        left: 5 + Math.random() * 90,
        duration: 7 + Math.random() * 5,
        drift: (Math.random() - 0.5) * 120,
        size: 14 + Math.random() * 10,
      };
      return [...prev, particle];
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - lastSpawnScroll.current) > SCROLL_STEP) {
        lastSpawnScroll.current = current;
        spawnParticle();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [spawnParticle]);

  const removeParticle = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => {
          const { Icon, className } = p.type;
          return (
            <motion.div
              key={p.id}
              className={`absolute ${className}`}
              style={{ left: `${p.left}%`, top: "-5%" }}
              initial={{ opacity: 0, x: 0, rotate: 0 }}
              animate={{
                opacity: [0, 0.7, 0.7, 0],
                y: ["0vh", "110vh"],
                x: [0, p.drift],
                rotate: [0, 180],
              }}
              transition={{ duration: p.duration, ease: "linear" }}
              onAnimationComplete={() => removeParticle(p.id)}
            >
              <Icon style={{ width: p.size, height: p.size }} strokeWidth={1.3} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}