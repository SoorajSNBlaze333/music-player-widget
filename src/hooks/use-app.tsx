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
  songArt?: string;
};

export type Album = {
  released: number;
  isPlaying: boolean;
  title: string;
  albumCover: string;
  currentSongIndex: number;
  songs: Song[];
};

export type Music = {
  band: string;
  album: Album;
};

type MusicStateAndHandlers = Music & {
  pauseAudio: () => void;
  playAudio: () => void;
  selectNextSong: () => void;
  selectPreviousSong: () => void;
  selectSong: (index: number) => void;
};

const AppContext = createContext<MusicStateAndHandlers | undefined>(undefined);

export const AppContextProvider = ({
  children,
  data,
}: PropsWithChildren<{
  data: {
    band: string;
    album: {
      title: string;
      released: number;
      albumCover: string;
      songs: Song[];
    };
  };
}>) => {
  const [musicState, setMusicState] = useState<Music>({
    band: data.band,
    album: {
      isPlaying: false,
      released: data.album.released,
      title: data.album.title,
      albumCover: data.album.albumCover,
      songs: data.album.songs,
      currentSongIndex: 0,
    },
  });

  const pauseAudio = () => {
    setMusicState((prev) => ({
      ...prev,
      album: {
        ...prev.album,
        isPlaying: false,
      },
    }));
  };

  const playAudio = () => {
    setMusicState((prev) => ({
      ...prev,
      album: {
        ...prev.album,
        isPlaying: true,
      },
    }));
  };

  const selectSong = (index: number) => {
    setMusicState((prev) => ({
      ...prev,
      album: {
        ...prev.album,
        currentSongIndex: index,
      },
    }));
  };

  const selectNextSong = () => {
    setMusicState((prev) => ({
      ...prev,
      album: {
        ...prev.album,
        currentSongIndex:
          (prev.album.currentSongIndex + 1) % prev.album.songs.length,
      },
    }));
  };

  const selectPreviousSong = () => {
    setMusicState((prev) => ({
      ...prev,
      album: {
        ...prev.album,
        currentSongIndex:
          prev.album.currentSongIndex - 1 < 0
            ? prev.album.songs.length - 1
            : prev.album.currentSongIndex - 1,
      },
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...musicState,
        playAudio,
        pauseAudio,
        selectSong,
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
