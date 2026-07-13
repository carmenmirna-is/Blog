import PageHeader from "../components/layout/PageHeader";
import { sections } from "../data/sections";

const tracks = [
  { title: "Petrichor", artist: "Hania Rani", mood: "Para leer" },
  { title: "Sakura", artist: "Ólafur Arnalds", mood: "Para escribir" },
  { title: "River Flows in You", artist: "Yiruma", mood: "Para pensar" },
  { title: "Night Owl", artist: "Galimatias", mood: "Para programar" },
];

export default function Playlist() {
  const section = sections.find((s) => s.id === "playlist");

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl glass p-4 shadow-petal">
            {tracks.map((track) => (
              <div
                key={track.title}
                className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-lavender/10"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{track.title}</p>
                  <p className="text-xs text-ink-soft">{track.artist}</p>
                </div>
                <span className="rounded-full bg-lavender/20 px-3 py-1 text-xs text-ink-soft">
                  {track.mood}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}