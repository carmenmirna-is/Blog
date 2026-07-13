import { createContext, useContext, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);

  const playTrack = (track) => setCurrentTrack(track);
  const closePlayer = () => setCurrentTrack(null);

  return (
    <PlayerContext.Provider value={{ currentTrack, playTrack, closePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}