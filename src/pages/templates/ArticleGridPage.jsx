import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { supabase } from "../../lib/supabaseClient";

export default function ArticleGridPage({ section }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("section", section.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al traer posts:", error);
      } else {
        setItems(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, [section.id]);

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-6">
          {loading ? (
            <p className="text-center text-ink-soft">Cargando entradas…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-ink-soft">
              Todavía no hay entradas aquí. Vuelve pronto.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
              <Link
                key={item.id}
                to={`/entrada/${item.id}`}
                className="block rounded-2xl border border-white/60 bg-paper/80 p-6 shadow-petal transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-semibold text-sage-deep">
                    {item.tag}
                  </span>
                  <span className="text-xs text-ink-soft">{item.date_label}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{item.excerpt}</p>
              </Link>
            ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}