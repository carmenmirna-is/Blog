import { useEffect, useState } from "react";
import { Lock, Pencil, Trash2, Check, X } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";
import { useAdminSession } from "../hooks/useAdminSession";
import ConfirmDialog from "../components/ui/ConfirmDialog";

export default function Diario() {
  const section = sections.find((s) => s.id === "diario");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [entryToDelete, setEntryToDelete] = useState(null);
  const { isAdmin } = useAdminSession();

  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("entry_date", { ascending: false });

      if (error) console.error(error);
      else setEntries(data);
      setLoading(false);
    }
    fetchEntries();
  }, []);

  const startEditing = (entry) => {
    setEditingId(entry.id);
    setEditText(entry.entry_text);
  };

  const saveEditing = async (entryId) => {
    const { error } = await supabase
      .from("journal_entries")
      .update({ entry_text: editText })
      .eq("id", entryId);

    if (error) {
      console.error(error);
      alert("No se pudo guardar. Revisa la consola.");
      return;
    }

    setEntries((prev) =>
      prev.map((e) => (e.id === entryId ? { ...e, entry_text: editText } : e))
    );
    setEditingId(null);
  };

  const executeDelete = async () => {
    const entry = entryToDelete;
    setEntryToDelete(null);

    const { error } = await supabase.from("journal_entries").delete().eq("id", entry.id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar. Revisa la consola.");
    } else {
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
    }
  };

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16 dark:bg-night">
        <div className="mx-auto max-w-2xl px-6">
          {loading ? (
            <p className="text-center text-ink-soft dark:text-cream/60">Cargando entradas…</p>
          ) : entries.length === 0 ? (
            <p className="text-center text-ink-soft dark:text-cream/60">
              Todavía no hay entradas aquí.
            </p>
          ) : (
            <ol className="relative border-l border-dashed border-sage/40 pl-8 dark:border-cream/15">
              {entries.map((entry) => (
                <li key={entry.id} className="mb-10 last:mb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[calc(2rem+4.5px)] mt-1.5 h-2.5 w-2.5 rounded-full bg-sage-deep ring-4 ring-cream dark:bg-sage-light dark:ring-night"
                  />
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <time className="font-body text-xs font-semibold uppercase tracking-widest text-sage-deep dark:text-sage-light">
                        {entry.entry_date}
                      </time>
                      {!entry.is_public && isAdmin && (
                        <span className="flex items-center gap-1 rounded-full bg-wood/15 px-2 py-0.5 text-[10px] font-semibold text-wood dark:text-gold">
                          <Lock className="h-2.5 w-2.5" strokeWidth={2} />
                          Privada
                        </span>
                      )}
                    </div>

                    {isAdmin && editingId !== entry.id && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => startEditing(entry)}
                          aria-label="Editar entrada"
                          className="rounded-full p-1.5 text-ink-soft/50 transition hover:bg-sage/15 hover:text-sage-deep"
                        >
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEntryToDelete(entry)}
                          aria-label="Eliminar entrada"
                          className="rounded-full p-1.5 text-ink-soft/50 transition hover:bg-rose/15 hover:text-rose-deep"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                      </div>
                    )}
                  </div>

                  {editingId === entry.id ? (
                    <div className="rounded-xl bg-paper/90 p-3 shadow-petal">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          aria-label="Cancelar"
                          className="rounded-full p-2 text-ink-soft/60 hover:bg-ink-soft/10"
                        >
                          <X className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEditing(entry.id)}
                          aria-label="Guardar"
                          className="rounded-full bg-sage-deep p-2 text-cream hover:bg-forest"
                        >
                          <Check className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="font-body text-base leading-relaxed text-ink dark:text-cream/80">
                      {entry.entry_text}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <ConfirmDialog
        open={!!entryToDelete}
        title="¿Eliminar esta entrada?"
        message="Esta entrada del diario se eliminará. No se puede deshacer."
        onConfirm={executeDelete}
        onCancel={() => setEntryToDelete(null)}
      />
    </>
  );
}