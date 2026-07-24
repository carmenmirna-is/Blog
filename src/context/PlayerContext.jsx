import { createContext, useContext, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([]); // toda la lista navegable actual
  const [currentIndex, setCurrentIndex] = useState(null);

  // list es opcional: si vienes desde /playlist, pasas la lista completa
  // para poder usar "siguiente/anterior"; si no, solo se reproduce esa canción sola.
  const playTrack = (track, list = null) => {
    const sourceList = list ?? queue;
    if (list) setQueue(list);
    const idx = sourceList.findIndex((t) => t.id === track.id);
    setCurrentIndex(idx >= 0 ? idx : 0);
    if (idx < 0 && !list) setQueue([track]);
  };

  const closePlayer = () => setCurrentIndex(null);

  const next = () => {
    if (currentIndex === null || queue.length === 0) return;
    setCurrentIndex((i) => (i + 1) % queue.length);
  };

  const prev = () => {
    if (currentIndex === null || queue.length === 0) return;
    setCurrentIndex((i) => (i - 1 + queue.length) % queue.length);
  };

  const currentTrack = currentIndex !== null ? queue[currentIndex] : null;

  return (
    <PlayerContext.Provider
      value={{ currentTrack, playTrack, closePlayer, next, prev, hasQueue: queue.length > 1 }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}