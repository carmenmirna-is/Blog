import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { sections } from "../data/sections";

// Saca el ID de una canción de Spotify desde su link completo
function getSpotifyEmbedUrl(url) {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? `https://open.spotify.com/embed/track/${match[1]}` : null;
}

// Saca el ID de un video de YouTube, sin importar si es link corto o largo
function getYouTubeEmbedUrl(url) {
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const id = watchMatch ? watchMatch[1] : shortMatch ? shortMatch[1] : null;
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export default function Playlist() {
  const section = sections.find((s) => s.id === "playlist");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-2xl px-6">
          {loading ? (
            <p className="text-center text-ink-soft">Cargando canciones…</p>
          ) : tracks.length === 0 ? (
            <p className="text-center text-ink-soft">Todavía no hay canciones aquí.</p>
          ) : (
            <div className="space-y-4">
              {tracks.map((track) => (
                <div key={track.id} className="rounded-2xl bg-paper/80 p-5 shadow-petal">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm font-semibold text-ink">{track.title}</p>
                      <p className="text-xs text-ink-soft">{track.artist}</p>
                    </div>
                    {track.mood && (
                      <span className="rounded-full bg-lavender/20 px-3 py-1 text-xs text-ink-soft">
                        {track.mood}
                      </span>
                    )}
                  </div>

                  {/* Reproductor, distinto según el origen de la canción */}
                  {track.source_type === "upload" && (
                    <audio controls src={track.media_url} className="w-full" />
                  )}

                  {track.source_type === "spotify" && getSpotifyEmbedUrl(track.media_url) && (
                    <iframe
                      src={getSpotifyEmbedUrl(track.media_url)}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="encrypted-media"
                      title={track.title}
                    />
                  )}

                  {track.source_type === "youtube" && getYouTubeEmbedUrl(track.media_url) && (
                    <iframe
                      src={getYouTubeEmbedUrl(track.media_url)}
                      width="100%"
                      height="200"
                      frameBorder="0"
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                      title={track.title}
                      className="rounded-xl"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}