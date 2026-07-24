import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

/**
 * Modal de confirmación propio, reemplaza el confirm() nativo del
 * navegador para poder mantener la estética del sitio.
 *
 * Uso: se controla con un estado booleano (open) desde el componente
 * que lo usa — no tiene estado propio de "abierto/cerrado".
 */
export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-paper p-6 shadow-petal-lg dark:bg-night"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose/15">
              <AlertTriangle className="h-5 w-5 text-rose-deep" strokeWidth={1.75} />
            </div>

            <h2 className="font-display text-xl font-semibold text-ink dark:text-cream">
              {title}
            </h2>
            <p className="mt-2 font-body text-sm text-ink-soft dark:text-cream/70">
              {message}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full px-5 py-2 font-body text-sm font-semibold text-ink-soft transition hover:bg-ink-soft/10 dark:text-cream/70"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-full bg-rose-deep px-5 py-2 font-body text-sm font-semibold text-cream transition hover:opacity-90"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}