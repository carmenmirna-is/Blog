import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";
import { useAdminSession } from "../hooks/useAdminSession";
import Divider from "../components/ui/Divider";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { isAdmin } = useAdminSession();

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

  const handleDelete = async () => {
    const confirmed = window.confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setDeleting(true);
    const { error } = await supabase.from("posts").delete().eq("id", post.id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar la entrada. Revisa la consola.");
      setDeleting(false);
    } else {
      const section = sections.find((s) => s.id === post.section);
      navigate(section ? section.path : "/");
    }
  };

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

  const paragraphs = (post.content ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="min-h-screen bg-cream px-6 pb-24 pt-32 dark:bg-night sm:pt-40">
      <div className="mx-auto max-w-[42rem]">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to={section ? section.path : "/"}
            className="link-underline font-body text-sm font-semibold text-sage-deep hover:text-forest dark:text-sage-light"
          >
            ← Volver a {section ? section.label : "Inicio"}
          </Link>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Link
                to={`/editar-entrada/${post.id}`}
                aria-label="Editar entrada"
                className="rounded-full p-2 text-ink-soft/60 transition hover:bg-sage/15 hover:text-sage-deep dark:text-cream/40 dark:hover:bg-sage/10"
              >
                <Pencil className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                aria-label="Eliminar entrada"
                className="rounded-full p-2 text-ink-soft/60 transition hover:bg-rose/15 hover:text-rose-deep disabled:opacity-50 dark:text-cream/40"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>

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

        <div className="font-body text-lg text-ink-soft dark:text-cream/80">
          {paragraphs.map((para, i) => (
            <p key={i} className={`mb-7 ${i === 0 ? "capitular" : ""}`}>
              {para}
            </p>
          ))}
        </div>

        {post.media_url && post.media_type === "image" && (
          <img src={post.media_url} alt={post.title} className="mt-10 w-full rounded-2xl shadow-petal" />
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