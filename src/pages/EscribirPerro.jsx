import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAdminSession } from "../hooks/useAdminSession";

export default function EscribirPerro() {
  const { isAdmin, loading: authLoading } = useAdminSession();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({ name: "", breed: "", personality: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    let photo_url = null;

    if (file) {
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("post-media")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        setStatus("error");
        setSaving(false);
        return;
      }

      const { data } = supabase.storage.from("post-media").getPublicUrl(filePath);
      photo_url = data.publicUrl;
    }

    const { error } = await supabase.from("dogs").insert([{ ...form, photo_url }]);

    setSaving(false);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", breed: "", personality: "" });
      setFile(null);
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
          Agregar un perrito
        </h1>

        {status === "success" && (
          <p className="mb-4 rounded-lg bg-sage/15 px-4 py-3 text-sm text-sage-deep">
            ¡Guardado!
          </p>
        )}
        {status === "error" && (
          <p className="mb-4 rounded-lg bg-rose/15 px-4 py-3 text-sm text-rose-deep">
            Hubo un error. Revisa la consola.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Nombre</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Raza</label>
            <input
              value={form.breed}
              onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Personalidad</label>
            <textarea
              value={form.personality}
              onChange={(e) => setForm((f) => ({ ...f, personality: e.target.value }))}
              rows={3}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">
              Foto (opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0] ?? null)}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink file:mr-3 file:rounded-full file:border-0 file:bg-sage/20 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-sage-deep"
            />
          </div>

          <button type="submit" disabled={saving} className="btn-primary w-full px-6 py-2.5 text-sm">
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}