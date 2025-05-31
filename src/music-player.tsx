import { Player } from "./components/player";
import { AppContextProvider } from "./hooks/use-app";

export default function MusicPlayer() {
  return (
    <AppContextProvider>
      <main className="h-full w-full bg-slate-600">
        <section className="relative h-full w-full flex justify-center items-center">
          <Player />
        </section>
      </main>
    </AppContextProvider>
  );
}
