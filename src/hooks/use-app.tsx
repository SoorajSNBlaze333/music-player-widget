import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export type Song = {
  title: string;
  duration: number;
  album: string;
  albumArt?: string;
};

type MusicState = {
  isPlaying: boolean;
  songs: string[];
  currentSongIndex: number;
};

type MusicStateAndHandlers = MusicState & {
  pauseAudio: () => void;
  playAudio: () => void;
  selectNextSong: () => void;
  selectPreviousSong: () => void;
};

const AppContext = createContext<MusicStateAndHandlers | undefined>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [musicState, setMusicState] = useState<MusicState>({
    isPlaying: false,
    songs: ["Faint", "Breaking the Habit", "Numb"],
    currentSongIndex: 0,
  });

  // useEffect(() => {
  //   const audio: HTMLAudioElement | null =
  //     document.querySelector("#audio-player");
  //   if (audio) {
  //     if (musicState.isPlaying) {
  //       audio.play();
  //     } else {
  //       audio.pause();
  //     }
  //   }
  // }, [musicState.isPlaying]);

  const pauseAudio = () => {
    setMusicState((prev) => ({
      ...prev,
      isPlaying: false,
    }));
  };

  const playAudio = () => {
    setMusicState((prev) => ({
      ...prev,
      isPlaying: true,
    }));
  };

  const selectNextSong = () => {
    setMusicState((prev) => ({
      ...prev,
      currentSongIndex: (prev.currentSongIndex + 1) % prev.songs.length,
    }));
  };

  const selectPreviousSong = () => {
    setMusicState((prev) => ({
      ...prev,
      currentSongIndex:
        prev.currentSongIndex - 1 < 0
          ? prev.songs.length - 1
          : prev.currentSongIndex - 1,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...musicState,
        playAudio,
        pauseAudio,
        selectNextSong,
        selectPreviousSong,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used inside AppContextProvider");
  }

  return ctx;
};
