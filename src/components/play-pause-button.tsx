import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";

export const PlayPauseButton = ({
  isPlaying,
  onPause,
  onPlay,
}: {
  isPlaying: boolean;
  onPause: () => void;
  onPlay: () => void;
}) => {
  return (
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
          onClick={onPause}
          className="cursor-pointer inline-flex justify-center items-center w-16"
        >
          <PauseIcon className="text-white size-9" weight="fill" />
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
          onClick={onPlay}
          className="cursor-pointer inline-flex justify-center items-center w-16"
        >
          <PlayIcon className="text-white size-9" weight="fill" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
