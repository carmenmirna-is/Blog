import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAccent } from "../../design-system/accentMap";

export default function SectionCard({ section, index = 0 }) {
  const accent = getAccent(section.accent);
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={section.path}
        className="group relative block h-full rounded-2xl border border-white/60 bg-paper/85 p-8 shadow-petal transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-petal-lg hover:shadow-gold/10 dark:border-cream/10 dark:bg-night/40"
      >
        <div
          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${accent.bgSoft} transition-transform duration-500 group-hover:rotate-6`}
        >
          <Icon className={`h-5 w-5 ${accent.text}`} strokeWidth={1.5} aria-hidden="true" />
        </div>

        <p className={`mb-2 font-body text-xs uppercase tracking-[0.2em] ${accent.text}`}>
          {section.tagline}
        </p>

        <h3 className="font-display text-2xl font-semibold leading-snug text-ink dark:text-cream">
          {section.label}
        </h3>

        <div className="my-4 h-px w-10 border-t border-dashed border-ink-soft/25 dark:border-cream/15" />

        <p className="font-body text-sm leading-relaxed text-ink-soft dark:text-cream/60">
          {section.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-1 font-body text-sm font-semibold text-forest opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-sage-light">
          Explorar →
        </span>
      </Link>
    </motion.div>
  );
}