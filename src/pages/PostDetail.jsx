import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";

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

      if (error) {
        console.error("Error al traer el post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="min-h-screen bg-cream pt-40 text-center text-ink-soft">Cargando…</p>;
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
        <p className="text-ink-soft">No encontramos esta entrada.</p>
        <Link to="/" className="mt-4 font-semibold text-forest">Volver al inicio</Link>
      </div>
    );
  }

  const section = sections.find((s) => s.id === post.section);

  return (
    <article className="min-h-screen bg-cream px-6 pt-32 pb-20">
      <div className="mx-auto max-w-2xl">
        <Link
          to={section ? section.path : "/"}
          className="mb-6 inline-block text-sm font-semibold text-sage-deep"
        >
          ← Volver a {section ? section.label : "Inicio"}
        </Link>

        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-semibold text-sage-deep">
            {post.tag}
          </span>
          <span className="text-xs text-ink-soft">{post.date_label}</span>
        </div>

        <h1 className="font-display text-4xl font-semibold text-ink">{post.title}</h1>

        {/* Texto completo de la entrada */}
        <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-ink-soft">
          {post.content}
        </div>

        {/* Archivo adjunto (foto, audio o video), si existe */}
        {post.media_url && post.media_type === "image" && (
          <img
            src={post.media_url}
            alt={post.title}
            className="mt-8 w-full rounded-2xl shadow-petal"
          />
        )}

        {post.media_url && post.media_type === "audio" && (
          <audio controls className="mt-8 w-full">
            <source src={post.media_url} />
            Tu navegador no soporta audio.
          </audio>
        )}

        {post.media_url && post.media_type === "video" && (
          <video controls className="mt-8 w-full rounded-2xl shadow-petal">
            <source src={post.media_url} />
            Tu navegador no soporta video.
          </video>
        )}
      </div>
    </article>
  );
}