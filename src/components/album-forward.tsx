import { FastForwardIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

export const AlbumForward = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="perspective-normal flex justify-center items-center">
      <motion.button
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1, type: "spring", bounce: 0.25 },
        }}
        className="text-white cursor-pointer transform-gpu"
        onClick={onClick}
        whileTap={{ x: 4, rotateY: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <FastForwardIcon className="size-8" weight="fill" />
      </motion.button>
    </div>
  );
};
