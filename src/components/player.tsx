import { ForwardIcon } from "@heroicons/react/24/solid";
import { BackwardIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useApp } from "../hooks/use-app";
import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

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
    isPlaying,
    playAudio,
    pauseAudio,
    songs,
    selectNextSong,
    selectPreviousSong,
    currentSongIndex,
  } = useApp();

  return (
    <AnimatePresence initial={!minimized}>
      {!minimized ? (
        <motion.section
          key="widget"
          initial={{ width: 600, height: 150 }}
          animate={{ width: 400, height: 650 }}
          exit={{ width: 600, height: 150 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          className="relative rounded-lg overflow-hidden border-[1px] border-slate-300 h-[650px] w-[400px] flex flex-col justify-start items-center"
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
            <AnimatePresence initial={!minimized}>
              {!minimized && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                  }}
                  className="w-full h-[300px] bg-[url(/background.jpg)] bg-center bg-cover"
                >
                  <div className="w-full h-full flex flex-col justify-end items-center bg-linear-to-b from-transparent to-black/90"></div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-end items-center">
              <div className="p-4 w-full">
                <p className="text-white font-bold text-4xl">Meteora</p>
                <p className="text-slate-300 font-semibold text-sm">
                  Linkin Park • 2003
                </p>
              </div>
            </div>
          </div>

          <motion.section
            className="w-full h-[425px] overflow-scroll flex flex-col justify-start items-center"
            ref={sectionRef}
          >
            {songs.map((song, index) => (
              <div
                key={index}
                className="p-3 w-full border-b-[1px] text-sm border-slate-300 text-slate-600 text-left"
              >
                {song}
              </div>
            ))}

            <motion.div
              drag="x"
              dragMomentum={false}
              dragConstraints={sectionRef}
              className="absolute h-2 w-2 bg-slate-500 rounded-full bottom-[70px] z-50 cursor-pointer"
            ></motion.div>
            <div className="absolute w-full bottom-0 h-[75px] border-t-[1px] border-slate-300 flex justify-center items-center text-xs text-slate-500">
              This is the playing zone
            </div>
          </motion.section>
        </motion.section>
      ) : (
        <motion.section
          key="widget"
          initial={{ width: 400, height: 650 }}
          animate={{ width: 600, height: 150 }}
          exit={{ width: 400, height: 650 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          className="rounded-xl overflow-hidden relative flex justify-center items-center h-[150px] w-[600px]"
        >
          <div className="h-full relative flex flex-col justify-center items-center w-full bg-[url(/background.jpg)] bg-center bg-cover">
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
                  <AnimatePresence custom={currentSongIndex} mode="wait">
                    <motion.div
                      custom={currentSongIndex}
                      key={`song-name-${songs[currentSongIndex]}`}
                      variants={container}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="flex justify-start items-center overflow-hidden w-full truncate"
                    >
                      {songs[currentSongIndex].split("").map((char, index) => (
                        <motion.p
                          key={`${char}-${index}`}
                          variants={item}
                          className="text-white font-semibold text-3xl text-ellipsis"
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
                        className="text-slate-300 font-semibold text-sm"
                      >
                        Meteora • 2:42
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <BackwardIcon
                    className="text-white size-9"
                    onClick={selectPreviousSong}
                  />
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.button
                        key="pause"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                        transition={{
                          duration: 0.08,
                        }}
                        onClick={pauseAudio}
                        className="cursor-pointer inline-flex justify-center items-center w-16"
                      >
                        <PauseIcon
                          className="text-white size-8"
                          weight="fill"
                        />
                      </motion.button>
                    ) : (
                      <motion.button
                        key="play"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                        transition={{
                          duration: 0.08,
                        }}
                        onClick={playAudio}
                        className="cursor-pointer inline-flex justify-center items-center w-16"
                      >
                        <PlayIcon className="text-white size-8" weight="fill" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  {/* {isPlaying ? (
                    <PauseIcon onClick={pauseAudio} />
                  ) : (
                    <PlayIcon
                      onClick={playAudio}
                      className="text-white size-10"
                    />
                  )} */}
                  <ForwardIcon
                    className="text-white size-9"
                    onClick={selectNextSong}
                  />
                </div>
              </section>
              {/* <input className="w-full" type="range" /> */}
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
