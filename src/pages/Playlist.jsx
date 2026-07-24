import { useEffect, useState } from "react";
import { Play, Trash2, Pencil, Check, X } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";
import { usePlayer } from "../context/PlayerContext";
import { useAdminSession } from "../hooks/useAdminSession";

export default function Playlist() {
  const section = sections.find((s) => s.id === "playlist");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", artist: "", mood: "" });
  const { currentTrack, playTrack } = usePlayer();
  const { isAdmin } = useAdminSession();

  useEffect(() => {
    async function fetchTracks() {
      const { data, error } = await supabase
        .from("playlist_tracks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setTracks(data);
      setLoading(false);
    }
    fetchTracks();
  }, []);

  const handleDelete = async (track) => {
    const confirmed = window.confirm(`¿Eliminar "${track.title}" de la playlist?`);
    if (!confirmed) return;

    setDeletingId(track.id);
    const { error } = await supabase.from("playlist_tracks").delete().eq("id", track.id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar la canción. Revisa la consola.");
    } else {
      setTracks((prev) => prev.filter((t) => t.id !== track.id));
    }
    setDeletingId(null);
  };

  const startEditing = (track) => {
    setEditingId(track.id);
    setEditForm({ title: track.title, artist: track.artist ?? "", mood: track.mood ?? "" });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = async (trackId) => {
    const { error } = await supabase
      .from("playlist_tracks")
      .update(editForm)
      .eq("id", trackId);

    if (error) {
      console.error(error);
      alert("No se pudo guardar. Revisa la consola.");
      return;
    }

    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, ...editForm } : t))
    );
    setEditingId(null);
  };

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16 pb-32 dark:bg-night">
        <div className="mx-auto max-w-2xl px-6">
          {loading ? (
            <p className="text-center text-ink-soft dark:text-cream/60">Cargando canciones…</p>
          ) : tracks.length === 0 ? (
            <p className="text-center text-ink-soft dark:text-cream/60">Todavía no hay canciones aquí.</p>
          ) : (
            <div className="space-y-2">
              {tracks.map((track) => {
                const isActive = currentTrack?.id === track.id;
                const isEditing = editingId === track.id;

                if (isEditing) {
                  return (
                    <div key={track.id} className="rounded-xl bg-paper/90 p-4 shadow-petal">
                      <div className="space-y-2">
                        <input
                          value={editForm.title}
                          onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                          placeholder="Título"
                          className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-1.5 text-sm text-ink"
                        />
                        <input
                          value={editForm.artist}
                          onChange={(e) => setEditForm((f) => ({ ...f, artist: e.target.value }))}
                          placeholder="Artista"
                          className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-1.5 text-sm text-ink"
                        />
                        <input
                          value={editForm.mood}
                          onChange={(e) => setEditForm((f) => ({ ...f, mood: e.target.value }))}
                          placeholder="Estado de ánimo"
                          className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-1.5 text-sm text-ink"
                        />
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          aria-label="Cancelar"
                          className="rounded-full p-2 text-ink-soft/60 hover:bg-ink-soft/10"
                        >
                          <X className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEditing(track.id)}
                          aria-label="Guardar"
                          className="rounded-full bg-sage-deep p-2 text-cream hover:bg-forest"
                        >
                          <Check className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={track.id}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                      isActive ? "bg-sage/20" : "bg-paper/80 hover:bg-sage/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => playTrack(track, tracks)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sage/20">
                        <Play className="h-3.5 w-3.5 text-sage-deep" strokeWidth={1.75} fill="currentColor" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{track.title}</p>
                        <p className="truncate text-xs text-ink-soft">{track.artist}</p>
                      </div>
                    </button>

                    <div className="flex flex-shrink-0 items-center gap-2">
                      {track.mood && (
                        <span className="rounded-full bg-lavender/20 px-3 py-1 text-xs text-ink-soft">
                          {track.mood}
                        </span>
                      )}
                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            onClick={() => startEditing(track)}
                            aria-label="Editar canción"
                            className="rounded-full p-1.5 text-ink-soft/60 transition hover:bg-sage/15 hover:text-sage-deep"
                          >
                            <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(track)}
                            disabled={deletingId === track.id}
                            aria-label="Eliminar canción"
                            className="rounded-full p-1.5 text-ink-soft/60 transition hover:bg-rose/15 hover:text-rose-deep disabled:opacity-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}