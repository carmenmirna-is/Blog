import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAdminSession } from "../hooks/useAdminSession";

export default function EscribirDiario() {
  const { isAdmin, loading: authLoading } = useAdminSession();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const [form, setForm] = useState({
    entry_text: "",
    is_public: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("journal_entries").insert([form]);

    setSaving(false);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ entry_text: "", is_public: true });
    }
  };

  if (authLoading) {
    return (
      <p className="min-h-screen bg-cream pt-40 text-center text-ink-soft dark:bg-night dark:text-cream/60">
        Cargando…
      </p>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center dark:bg-night">
        <p className="text-ink-soft dark:text-cream/60">Necesitas iniciar sesión para escribir.</p>
        <Link to="/panel" className="font-semibold text-forest dark:text-sage-light">
          Ir al Panel →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-16 pt-32 dark:bg-night">
      <div className="mx-auto max-w-xl rounded-2xl bg-paper/85 p-8 shadow-petal dark:bg-night/40">
        <h1 className="mb-6 font-display text-2xl font-semibold text-ink dark:text-cream">
          Nueva entrada del diario
        </h1>

        {status === "success" && (
          <p className="mb-4 rounded-lg bg-sage/15 px-4 py-3 text-sm text-sage-deep">
            ¡Entrada guardada!
          </p>
        )}
        {status === "error" && (
          <p className="mb-4 rounded-lg bg-rose/15 px-4 py-3 text-sm text-rose-deep">
            Hubo un error. Revisa la consola.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">
              ¿Qué pasó hoy?
            </label>
            <textarea
              value={form.entry_text}
              onChange={(e) => setForm((f) => ({ ...f, entry_text: e.target.value }))}
              required
              rows={5}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <label className="flex items-center gap-3 rounded-lg bg-sage/10 px-4 py-3">
            <input
              type="checkbox"
              checked={!form.is_public}
              onChange={(e) => setForm((f) => ({ ...f, is_public: !e.target.checked }))}
              className="h-4 w-4 accent-sage-deep"
            />
            <span className="text-sm text-ink dark:text-cream">
              Hacer esta entrada <strong>privada</strong> (solo tú podrás verla)
            </span>
          </label>

          <button type="submit" disabled={saving} className="btn-primary w-full px-6 py-2.5 text-sm">
            {saving ? "Guardando…" : "Guardar entrada"}
          </button>
        </form>
      </div>
    </div>
  );
}