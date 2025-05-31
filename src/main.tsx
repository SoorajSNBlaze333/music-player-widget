import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MusicPlayer from "./music-player";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MusicPlayer />
  </StrictMode>
);
