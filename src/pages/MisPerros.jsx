import { useEffect, useState } from "react";
import { PawPrint, Pencil, Trash2, Check, X } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";
import { useAdminSession } from "../hooks/useAdminSession";
import ConfirmDialog from "../components/ui/ConfirmDialog";

export default function MisPerros() {
  const section = sections.find((s) => s.id === "mis-perros");
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", breed: "", personality: "" });
  const [dogToDelete, setDogToDelete] = useState(null);
  const { isAdmin } = useAdminSession();

  useEffect(() => {
    async function fetchDogs() {
      const { data, error } = await supabase
        .from("dogs")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) console.error(error);
      else setDogs(data);
      setLoading(false);
    }
    fetchDogs();
  }, []);

  const startEditing = (dog) => {
    setEditingId(dog.id);
    setEditForm({ name: dog.name, breed: dog.breed ?? "", personality: dog.personality ?? "" });
  };

  const saveEditing = async (dogId) => {
    const { error } = await supabase.from("dogs").update(editForm).eq("id", dogId);

    if (error) {
      console.error(error);
      alert("No se pudo guardar. Revisa la consola.");
      return;
    }

    setDogs((prev) => prev.map((d) => (d.id === dogId ? { ...d, ...editForm } : d)));
    setEditingId(null);
  };

  const executeDelete = async () => {
    const dog = dogToDelete;
    setDogToDelete(null);

    const { error } = await supabase.from("dogs").delete().eq("id", dog.id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar. Revisa la consola.");
    } else {
      setDogs((prev) => prev.filter((d) => d.id !== dog.id));
    }
  };

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16 dark:bg-night">
        <div className="mx-auto max-w-5xl px-6">
          {loading ? (
            <p className="text-center text-ink-soft dark:text-cream/60">Cargando…</p>
          ) : dogs.length === 0 ? (
            <p className="text-center text-ink-soft dark:text-cream/60">
              Todavía no hay perritos aquí.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {dogs.map((dog) => {
                const isEditing = editingId === dog.id;

                return (
                  <div
                    key={dog.id}
                    className="relative rounded-2xl glass p-7 text-center shadow-petal"
                  >
                    {isAdmin && !isEditing && (
                      <div className="absolute right-3 top-3 flex gap-1">
                        <button
                          type="button"
                          onClick={() => startEditing(dog)}
                          aria-label="Editar perrito"
                          className="rounded-full p-1.5 text-ink-soft/50 transition hover:bg-sage/15 hover:text-sage-deep"
                        >
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDogToDelete(dog)}
                          aria-label="Eliminar perrito"
                          className="rounded-full p-1.5 text-ink-soft/50 transition hover:bg-rose/15 hover:text-rose-deep"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                      </div>
                    )}

                    {dog.photo_url ? (
                      <img
                        src={dog.photo_url}
                        alt={dog.name}
                        className="mx-auto mb-4 h-20 w-20 rounded-full object-cover shadow-petal"
                      />
                    ) : (
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-wood/10">
                        <PawPrint className="h-7 w-7 text-wood" strokeWidth={1.5} />
                      </div>
                    )}

                    {isEditing ? (
                      <div className="space-y-2 text-left">
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Nombre"
                          className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-1.5 text-sm text-ink"
                        />
                        <input
                          value={editForm.breed}
                          onChange={(e) => setEditForm((f) => ({ ...f, breed: e.target.value }))}
                          placeholder="Raza"
                          className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-1.5 text-sm text-ink"
                        />
                        <textarea
                          value={editForm.personality}
                          onChange={(e) => setEditForm((f) => ({ ...f, personality: e.target.value }))}
                          placeholder="Personalidad"
                          rows={3}
                          className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-1.5 text-sm text-ink"
                        />
                        <div className="flex justify-center gap-2 pt-1">
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
                            onClick={() => saveEditing(dog.id)}
                            aria-label="Guardar"
                            className="rounded-full bg-sage-deep p-2 text-cream hover:bg-forest"
                          >
                            <Check className="h-4 w-4" strokeWidth={1.75} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-display text-2xl font-semibold text-ink dark:text-cream">
                          {dog.name}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-widest text-wood dark:text-gold">
                          {dog.breed}
                        </p>
                        <p className="mt-3 text-sm text-ink-soft dark:text-cream/70">
                          {dog.personality}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ConfirmDialog
        open={!!dogToDelete}
        title="¿Eliminar este perrito?"
        message={dogToDelete ? `Se eliminará a "${dogToDelete.name}" de la página.` : ""}
        onConfirm={executeDelete}
        onCancel={() => setDogToDelete(null)}
      />
    </>
  );
}