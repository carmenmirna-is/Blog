import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";
import Divider from "../components/ui/Divider";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error al traer el post:", error);
      else setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <p className="min-h-screen bg-cream pt-40 text-center text-ink-soft dark:bg-night dark:text-cream/60">
        Cargando…
      </p>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center dark:bg-night">
        <p className="text-ink-soft dark:text-cream/60">No encontramos esta entrada.</p>
        <Link to="/" className="mt-4 font-semibold text-forest dark:text-sage-light">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const section = sections.find((s) => s.id === post.section);

  // Partimos el texto en párrafos reales (separados por línea en blanco),
  // para poder darle a cada uno su propio espaciado y aplicar la
  // capitular solo al primero.
  const paragraphs = (post.content ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="min-h-screen bg-cream px-6 pb-24 pt-32 dark:bg-night sm:pt-40">
      {/* Ancho cómodo de lectura: ~65 caracteres por línea, el estándar
          editorial para no cansar la vista */}
      <div className="mx-auto max-w-[42rem]">
        <Link
          to={section ? section.path : "/"}
          className="mb-8 inline-block font-body text-sm font-semibold text-sage-deep transition-colors hover:text-forest dark:text-sage-light"
        >
          ← Volver a {section ? section.label : "Inicio"}
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-sage/15 px-3 py-1 font-body text-xs font-semibold text-sage-deep dark:bg-sage/10 dark:text-sage-light">
            {post.tag}
          </span>
          <span className="font-body text-xs text-ink-soft dark:text-cream/50">
            {post.date_label}
          </span>
        </div>

        <h1 className="font-display text-4xl font-semibold leading-tight text-ink dark:text-cream sm:text-5xl">
          {post.title}
        </h1>

        <Divider symbol="✦" />

        {/* Cuerpo del texto, tipo novela: centrado, ancho cómodo,
            párrafos bien separados, capitular en el primero */}
        <div className="font-body text-lg text-ink-soft dark:text-cream/80">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={`mb-7 ${i === 0 ? "capitular" : ""}`}
            >
              {para}
            </p>
          ))}
        </div>

        {post.media_url && post.media_type === "image" && (
          <img
            src={post.media_url}
            alt={post.title}
            className="mt-10 w-full rounded-2xl shadow-petal"
          />
        )}

        {post.media_url && post.media_type === "audio" && (
          <audio controls className="mt-10 w-full">
            <source src={post.media_url} />
            Tu navegador no soporta audio.
          </audio>
        )}

        {post.media_url && post.media_type === "video" && (
          <video controls className="mt-10 w-full rounded-2xl shadow-petal">
            <source src={post.media_url} />
            Tu navegador no soporta video.
          </video>
        )}
      </div>
    </article>
  );
}