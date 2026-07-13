import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";
import { usePlayer } from "../context/PlayerContext";

export default function Playlist() {
  const section = sections.find((s) => s.id === "playlist");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTrack, playTrack } = usePlayer();

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
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                      isActive ? "bg-sage/20" : "bg-paper/80 hover:bg-sage/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/20">
                        <Play className="h-3.5 w-3.5 text-sage-deep" strokeWidth={1.75} fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">{track.title}</p>
                        <p className="text-xs text-ink-soft">{track.artist}</p>
                      </div>
                    </div>
                    {track.mood && (
                      <span className="rounded-full bg-lavender/20 px-3 py-1 text-xs text-ink-soft">
                        {track.mood}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}