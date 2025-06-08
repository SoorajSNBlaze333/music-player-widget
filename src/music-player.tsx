import { Player } from "./components/player";
import { AppContextProvider } from "./hooks/use-app";

export default function MusicPlayer() {
  const data = {
    band: "Linkin Park",
    album: {
      title: "Meteora",
      released: 2008,
      albumCover: "/background.jpg",
      songs: [
        {
          title: "Numb",
          duration: 188,
          album: "Meteora",
          songArt: "",
        },
        {
          title: "Breaking The Habit",
          duration: 196,
          album: "Meteora",
          songArt: "",
        },
        {
          title: "Faint",
          duration: 162,
          album: "Meteora",
          songArt: "",
        },
      ],
    },
  };

  return (
    <AppContextProvider data={data}>
      <main className="h-full w-full bg-slate-600">
        <section className="relative h-full w-full flex justify-center items-center">
          <Player />
        </section>
      </main>
    </AppContextProvider>
  );
}
