import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useApp } from "../hooks/use-app";
import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { AlbumForward } from "./album-forward";
import { AlbumBackward } from "./album-backward";
import { PlayPauseButton } from "./play-pause-button";
import { SongsListBig } from "./songs-list-big";
import { formatTime } from "../utils";
import { AlbumCoverLarge } from "./album-cover-large";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      type: "spring",
      bounce: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -5, scale: 0.8 },
  show: { opacity: 1, x: 0, scale: 1 },
};

export const Player = () => {
  const [minimized, setMinimized] = useState(true);
  const sectionRef = useRef(null);
  const {
    band,
    album,
    playAudio,
    pauseAudio,
    selectSong,
    selectNextSong,
    selectPreviousSong,
  } = useApp();
  const { isPlaying, albumCover, songs, currentSongIndex } = album;

  return (
    <AnimatePresence initial={!minimized}>
      {!minimized ? (
        <motion.section
          key="widget"
          initial={{ width: 500, height: 120 }}
          animate={{ width: 400, height: 650 }}
          exit={{ width: 500, height: 120 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          className="relative rounded-lg overflow-hidden border-2 border-slate-900 h-[650px] w-[400px] flex flex-col justify-start items-center bg-black"
        >
          <div className="h-[300px] w-full bg-black relative">
            <AnimatePresence initial={!minimized}>
              {!minimized && (
                <motion.button
                  className="absolute right-2 top-2 z-40 cursor-pointer"
                  onClick={() => setMinimized(true)}
                >
                  <ArrowsPointingInIcon className="text-slate-100 size-5" />
                </motion.button>
              )}
            </AnimatePresence>
            <AlbumCoverLarge band={band} album={album} minimized={minimized} />
          </div>

          <motion.section
            className="w-full h-[500px] bg-black overflow-scroll flex flex-col justify-start items-center"
            ref={sectionRef}
          >
            <SongsListBig
              songs={songs}
              currentSongIndex={currentSongIndex}
              selectSong={selectSong}
            />
            <div className="absolute w-full bottom-0 h-[75px] p-2 flex justify-center items-center text-slate-500">
              <div className="flex justify-center items-center gap-2 w-full h-full">
                <AlbumBackward onClick={selectPreviousSong} />
                <PlayPauseButton
                  isPlaying={isPlaying}
                  onPause={pauseAudio}
                  onPlay={playAudio}
                />
                <AlbumForward onClick={selectNextSong} />
              </div>
            </div>
          </motion.section>
        </motion.section>
      ) : (
        <motion.section
          key="widget"
          initial={{ width: 400, height: 650 }}
          animate={{ width: 500, height: 120 }}
          exit={{ width: 400, height: 650 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          className="rounded-xl overflow-hidden relative flex justify-center items-center h-[120px] w-[500px]"
        >
          <div
            className={`h-full relative flex flex-col justify-center items-center w-full bg-[url(${albumCover})] bg-center bg-cover`}
          >
            <div className="h-full relative w-full flex flex-col p-6 px-8 justify-center items-center gap-4 bg-gradient-to-r from-black via-transparent to-black backdrop-blur-[2px]">
              <AnimatePresence initial={minimized}>
                {minimized && (
                  <motion.button
                    key="maximize"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.2 }}
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setMinimized(false)}
                  >
                    <ArrowsPointingOutIcon className="text-slate-100 size-5" />
                  </motion.button>
                )}
              </AnimatePresence>
              <section className="w-full h-full flex justify-between items-center gap-4">
                <div className="flex flex-col justify-center items-start">
                  <p className="text-xs text-gray-400">Now Playing</p>
                  <AnimatePresence custom={currentSongIndex} mode="wait">
                    <motion.div
                      custom={currentSongIndex}
                      key={`song-name-${songs[currentSongIndex].title}`}
                      variants={container}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="flex justify-start items-center overflow-hidden w-full truncate"
                    >
                      {songs[currentSongIndex].title
                        .split("")
                        .map((char, index) => (
                          <motion.p
                            key={`${char}-${index}`}
                            variants={item}
                            className="text-white font-semibold text-2xl text-ellipsis"
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.p>
                        ))}
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence initial={minimized}>
                    {minimized && (
                      <motion.p
                        key="song-album"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.2 }}
                        className="text-slate-300 font-semibold text-xs"
                      >
                        {songs[currentSongIndex].album} •{" "}
                        {formatTime(songs[currentSongIndex].duration)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <AlbumBackward onClick={selectPreviousSong} />
                  <PlayPauseButton
                    isPlaying={isPlaying}
                    onPause={pauseAudio}
                    onPlay={playAudio}
                  />
                  <AlbumForward onClick={selectNextSong} />
                </div>
              </section>
            </div>
          </div>
        </motion.section>
      )}
      <audio id="audio-player" controls={false}>
        <source src="/faint.mp3" type="audio/mpeg" />
      </audio>
    </AnimatePresence>
  );
};
