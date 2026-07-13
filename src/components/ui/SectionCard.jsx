import { motion } from "framer-motion";

export default function SectionCard({ section, index = 0 }) {
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="rounded-2xl border border-white/60 bg-paper/80 p-6 shadow-petal transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
        <Icon className="h-5 w-5 text-sage-deep" strokeWidth={1.75} />
      </div>

      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-sage-deep">
        {section.tagline}
      </p>

      <h3 className="font-display text-2xl font-semibold text-ink">
        {section.label}
      </h3>

      <p className="mt-2 text-sm text-ink-soft">
        {section.description}
      </p>
    </motion.div>
  );
}