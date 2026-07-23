import { useEffect, useState } from "react";
import { Play, Trash2 } from "lucide-react";
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

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16 pb-32">
        <div className="mx-auto max-w-2xl px-6">
          {loading ? (
            <p className="text-center text-ink-soft">Cargando canciones…</p>
          ) : tracks.length === 0 ? (
            <p className="text-center text-ink-soft">Todavía no hay canciones aquí.</p>
          ) : (
            <div className="space-y-2">
              {tracks.map((track) => {
                const isActive = currentTrack?.id === track.id;
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
                        <button
                          type="button"
                          onClick={() => handleDelete(track)}
                          disabled={deletingId === track.id}
                          aria-label="Eliminar canción"
                          className="rounded-full p-1.5 text-ink-soft/60 transition hover:bg-rose/15 hover:text-rose-deep disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
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