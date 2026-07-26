import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const writableOptions = [
  { value: "biblioteca", label: "Biblioteca" },
  { value: "blog", label: "Blog" },
];

const blogCategories = [
  "Personal",
  "Mi Carrera",
  "Sociedad",
  "Investigación",
  "Proyecto Cafetería",
  "Novelas",
  "Poemas",
];

export default function Escribir() {
  const [status, setStatus] = useState(null);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    section: "blog",
    category: "Personal",
    title: "",
    excerpt: "",
    content: "",
    tag: "",
    date_label: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] ?? null);
  };

  const getMediaType = (f) => {
    if (!f) return null;
    if (f.type.startsWith("image/")) return "image";
    if (f.type.startsWith("audio/")) return "audio";
    if (f.type.startsWith("video/")) return "video";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let media_url = null;
    let media_type = null;

    if (file) {
      setStatus("uploading");
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("post-media")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error al subir el archivo:", uploadError);
        setStatus("error");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("post-media")
        .getPublicUrl(filePath);

      media_url = publicUrlData.publicUrl;
      media_type = getMediaType(file);
    }

    setStatus("sending");

    const payload = {
      section: form.section,
      category: form.section === "blog" ? form.category : null,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      tag: form.tag,
      date_label: form.date_label,
      media_url,
      media_type,
    };

    const { error } = await supabase.from("posts").insert([payload]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({
        section: "blog",
        category: "Personal",
        title: "",
        excerpt: "",
        content: "",
        tag: "",
        date_label: "",
      });
      setFile(null);
    }
  };

  const isBusy = status === "uploading" || status === "sending";

  return (
    <div className="min-h-screen bg-cream px-6 py-16 pt-32 dark:bg-night">
      <div className="mx-auto max-w-2xl rounded-2xl bg-paper/85 p-8 shadow-petal dark:bg-night/40">
        <h1 className="mb-6 font-display text-2xl font-semibold text-ink dark:text-cream">
          Escribir nueva entrada
        </h1>

        {status === "success" && (
          <p className="mb-4 rounded-lg bg-sage/15 px-4 py-3 text-sm text-sage-deep">
            ¡Entrada publicada!
          </p>
        )}
        {status === "error" && (
          <p className="mb-4 rounded-lg bg-rose/15 px-4 py-3 text-sm text-rose-deep">
            Hubo un error al publicar. Revisa la consola (F12).
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Sección</label>
            <select
              name="section"
              value={form.section}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            >
              {writableOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {form.section === "blog" && (
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Categoría</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
              >
                {blogCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

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
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Extracto (resumen corto)</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Contenido completo</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Etiqueta</label>
              <input
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="Ensayo, Reseña…"
                className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">Fecha a mostrar</label>
              <input
                name="date_label"
                value={form.date_label}
                onChange={handleChange}
                placeholder="Jul 2026"
                className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink dark:text-cream">
              Foto, audio o video (opcional)
            </label>
            <input
              type="file"
              accept="image/*,audio/*,video/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink file:mr-3 file:rounded-full file:border-0 file:bg-sage/20 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-sage-deep"
            />
            {file && <p className="mt-1 text-xs text-ink-soft">Seleccionado: {file.name}</p>}
          </div>

          <button type="submit" disabled={isBusy} className="btn-primary w-full px-6 py-2.5 text-sm">
            {status === "uploading" && "Subiendo archivo…"}
            {status === "sending" && "Publicando…"}
            {!isBusy && "Publicar entrada"}
          </button>
        </form>
      </div>
    </div>
  );
}