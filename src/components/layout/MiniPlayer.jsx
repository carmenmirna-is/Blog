import { X } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";

function getSpotifyEmbedUrl(url) {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? `https://open.spotify.com/embed/track/${match[1]}` : null;
}

function getYouTubeEmbedUrl(url) {
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const id = watchMatch ? watchMatch[1] : shortMatch ? shortMatch[1] : null;
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
}

export default function MiniPlayer() {
  const { currentTrack, closePlayer } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest/95 px-4 py-3 text-cream backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <div className="min-w-0 flex-shrink-0">
          <p className="truncate font-body text-sm font-semibold">{currentTrack.title}</p>
          <p className="truncate text-xs text-cream/60">{currentTrack.artist}</p>
        </div>

        <div className="min-w-0 flex-1">
          {currentTrack.source_type === "upload" && (
            <audio controls autoPlay src={currentTrack.media_url} className="w-full" />
          )}

          {currentTrack.source_type === "spotify" && getSpotifyEmbedUrl(currentTrack.media_url) && (
            <iframe
              src={getSpotifyEmbedUrl(currentTrack.media_url)}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media; autoplay"
              title={currentTrack.title}
            />
          )}

          {currentTrack.source_type === "youtube" && getYouTubeEmbedUrl(currentTrack.media_url) && (
            <iframe
              src={getYouTubeEmbedUrl(currentTrack.media_url)}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media; autoplay; picture-in-picture"
              title={currentTrack.title}
            />
          )}
        </div>

        <button
          type="button"
          onClick={closePlayer}
          aria-label="Cerrar reproductor"
          className="flex-shrink-0 rounded-full p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}