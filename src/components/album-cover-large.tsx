import { AnimatePresence, motion } from "motion/react";
import type { Album } from "../hooks/use-app";

export const AlbumCoverLarge = ({
  minimized,
  band,
  album,
}: {
  minimized: boolean;
  band: string;
  album: Album;
}) => {
  return (
    <>
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
            className={`w-full h-[300px] bg-[url(${album.albumCover})] bg-center bg-cover`}
          >
            <div className="w-full h-full flex flex-col justify-end items-center bg-linear-to-b from-transparent to-black/90"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-end items-center">
        <div className="p-4 w-full">
          <p className="text-white font-bold text-4xl">{band}</p>
          <p className="text-slate-300 font-semibold text-sm">
            {album.title} • {album.released}
          </p>
        </div>
      </div>
    </>
  );
};
