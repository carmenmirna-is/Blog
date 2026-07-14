import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Divider from "../../components/ui/Divider";
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

      <Divider symbol="❀" />

      <section className="bg-cream py-16 dark:bg-night">
        <div className="mx-auto max-w-6xl px-6">
          {loading ? (
            <p className="text-center text-ink-soft dark:text-cream/60">Cargando entradas…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-ink-soft dark:text-cream/60">
              Todavía no hay entradas aquí. Vuelve pronto.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  to={`/entrada/${item.id}`}
                  className="group block rounded-2xl border border-white/60 bg-paper/85 p-7 shadow-petal transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-petal-lg hover:shadow-gold/10 dark:border-cream/10 dark:bg-night/40"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-semibold text-sage-deep dark:bg-sage/10 dark:text-sage-light">
                      {item.tag}
                    </span>
                    <span className="text-xs text-ink-soft dark:text-cream/50">
                      {item.date_label}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-ink dark:text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft dark:text-cream/60">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}