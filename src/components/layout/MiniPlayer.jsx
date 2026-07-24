import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";

function getSpotifyEmbedUrl(url) {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? `https://open.spotify.com/embed/track/${match[1]}` : null;
}

function getYouTubeEmbedUrl(url) {
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const id = watchMatch ? watchMatch[1] : shortMatch ? shortMatch[1] : null;
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
}

// Convierte segundos (137.4) a formato "2:17"
function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const { currentTrack, closePlayer, next, prev, hasQueue } = usePlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const isUpload = currentTrack?.source_type === "upload";

  // Cuando cambia la canción (o se cierra), reinicia el estado del reproductor
  useEffect(() => {
    setProgress(0);
    setDuration(0);
    setIsPlaying(false);
  }, [currentTrack?.id]);

  // Conecta los eventos nativos del <audio> con nuestro estado de React
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isUpload) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => (hasQueue ? next() : setIsPlaying(false));

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    audio.volume = volume;
    audio.play().catch(() => {}); // autoplay puede fallar si el navegador lo bloquea; lo ignoramos

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack?.id, isUpload]);

  if (!currentTrack) return null;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setProgress(value);
  };

  const handleVolume = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest/95 px-4 py-3 text-cream shadow-petal-lg backdrop-blur-md dark:bg-night/95">
      <div className="mx-auto flex max-w-3xl flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Ícono giratorio mientras suena, quieto en pausa */}
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cream/10 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            <Music2 className="h-4 w-4 text-gold" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-body text-sm font-semibold">{currentTrack.title}</p>
            <p className="truncate text-xs text-cream/60">{currentTrack.artist}</p>
          </div>

          {/* Controles: solo tienen sentido completo para audio subido */}
          <div className="flex flex-shrink-0 items-center gap-1">
            {hasQueue && (
              <button
                type="button"
                onClick={prev}
                aria-label="Canción anterior"
                className="rounded-full p-2 text-cream/80 hover:bg-cream/10 hover:text-cream"
              >
                <SkipBack className="h-4 w-4" strokeWidth={1.75} fill="currentColor" />
              </button>
            )}

            {isUpload && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
                className="rounded-full bg-gold p-2.5 text-wood-deep hover:bg-gold/90"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" strokeWidth={1.75} fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4" strokeWidth={1.75} fill="currentColor" />
                )}
              </button>
            )}

            {hasQueue && (
              <button
                type="button"
                onClick={next}
                aria-label="Siguiente canción"
                className="rounded-full p-2 text-cream/80 hover:bg-cream/10 hover:text-cream"
              >
                <SkipForward className="h-4 w-4" strokeWidth={1.75} fill="currentColor" />
              </button>
            )}

            <button
              type="button"
              onClick={closePlayer}
              aria-label="Cerrar reproductor"
              className="ml-1 rounded-full p-2 text-cream/60 hover:bg-cream/10 hover:text-cream"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Reproductor real, según el tipo de origen */}
        {isUpload && (
          <div className="flex items-center gap-3">
            <span className="w-9 flex-shrink-0 text-right font-body text-xs text-cream/50">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              className="h-1 flex-1 cursor-pointer accent-gold"
              aria-label="Progreso de la canción"
            />
            <span className="w-9 flex-shrink-0 font-body text-xs text-cream/50">
              {formatTime(duration)}
            </span>
            <Volume2 className="h-4 w-4 flex-shrink-0 text-cream/60" strokeWidth={1.75} />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="h-1 w-16 flex-shrink-0 cursor-pointer accent-gold"
              aria-label="Volumen"
            />
            <audio ref={audioRef} src={currentTrack.media_url} />
          </div>
        )}

        {currentTrack.source_type === "youtube" && getYouTubeEmbedUrl(currentTrack.media_url) && (
          <div className="overflow-hidden rounded-xl">
            <iframe
              src={getYouTubeEmbedUrl(currentTrack.media_url)}
              width="100%"
              height="70"
              frameBorder="0"
              allow="encrypted-media; autoplay; picture-in-picture"
              title={currentTrack.title}
              className="block"
            />
          </div>
        )}
      </div>
    </div>
  );
}