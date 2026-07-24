import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";
import { useAdminSession } from "../hooks/useAdminSession";

const writableSections = sections.filter((s) =>
  ["biblioteca", "blog", "tecnologia", "ingenieria-de-datos", "sociedad",
   "investigacion", "proyecto-cafeteria", "novelas", "poemas"].includes(s.id)
);

export default function EditarEntrada() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAdminSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
      if (error) console.error(error);
      else setForm(data);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("posts")
      .update({
        section: form.section,
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        tag: form.tag,
        date_label: form.date_label,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.error(error);
      alert("No se pudo guardar. Revisa la consola.");
    } else {
      navigate(`/entrada/${id}`);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center dark:bg-night">
        <p className="text-ink-soft dark:text-cream/60">Necesitas iniciar sesión para editar.</p>
        <Link to="/panel" className="font-semibold text-forest dark:text-sage-light">
          Ir al Panel →
        </Link>
      </div>
    );
  }

  if (loading || !form) {
    return (
      <p className="min-h-screen bg-cream pt-40 text-center text-ink-soft dark:bg-night dark:text-cream/60">
        Cargando…
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-16 pt-32 dark:bg-night">
      <div className="mx-auto max-w-2xl rounded-2xl bg-paper/85 p-8 shadow-petal dark:bg-night/40">
        <h1 className="mb-6 font-display text-2xl font-semibold text-ink dark:text-cream">
          Editar entrada
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Sección</label>
            <select
              name="section"
              value={form.section}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            >
              {writableSections.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Extracto</label>
            <textarea
              name="excerpt"
              value={form.excerpt ?? ""}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Contenido completo</label>
            <textarea
              name="content"
              value={form.content ?? ""}
              onChange={handleChange}
              rows={10}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Etiqueta</label>
              <input
                name="tag"
                value={form.tag ?? ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Fecha a mostrar</label>
              <input
                name="date_label"
                value={form.date_label ?? ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
              />
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-primary w-full px-6 py-2.5 text-sm">
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}