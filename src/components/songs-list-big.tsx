import type { Song } from "../hooks/use-app";
import { formatTime } from "../utils";

export const SongsListBig = ({
  songs,
  currentSongIndex,
  selectSong,
}: {
  songs: Song[];
  currentSongIndex: number;
  selectSong: (index: number) => void;
}) => {
  return (
    <div className="p-1 w-full flex flex-col gap-1.5">
      {songs.map((song, index) => (
        <div
          key={index}
          className={`p-3 w-full text-xs text-left cursor-pointer hover:bg-white/15 hover:text-white/60 rounded-lg ${
            currentSongIndex === index
              ? "bg-white/20 text-white"
              : "text-white/50"
          } flex justify-between items-center`}
          onClick={() => selectSong(index)}
        >
          <p>{song.title}</p>
          <p className="">{formatTime(song.duration)}</p>
        </div>
      ))}
    </div>
  );
};
