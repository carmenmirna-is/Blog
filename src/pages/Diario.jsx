import PageHeader from "../components/layout/PageHeader";
import { sections } from "../data/sections";

const entries = [
  { date: "10 jul 2026", text: "Terminé de armar el design system del sitio." },
  { date: "2 jul 2026", text: "Compré una libreta nueva solo para anotar ideas de la novela." },
  { date: "24 jun 2026", text: "Tarde lenta de café y lectura. A veces no pasa nada importante y está bien." },
];

export default function Diario() {
  const section = sections.find((s) => s.id === "diario");

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="border-l-2 border-dashed border-sage/40 pl-6">
            {entries.map((entry) => (
              <div key={entry.date} className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-sage-deep">
                  {entry.date}
                </p>
                <p className="mt-1 text-ink">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}