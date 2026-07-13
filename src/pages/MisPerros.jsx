import PageHeader from "../components/layout/PageHeader";
import { PawPrint } from "lucide-react";
import { sections } from "../data/sections";

const dogs = [
  { name: "Manzana", breed: "Mestiza", personality: "Vigilante de la puerta, experta en siestas al sol." },
  { name: "Romero", breed: "Mestizo", personality: "El más curioso de la casa, investiga todo lo nuevo." },
  { name: "Canela", breed: "Mestiza", personality: "Tranquila y leal, siempre cerca de quien esté leyendo." },
];

export default function MisPerros() {
  const section = sections.find((s) => s.id === "mis-perros");

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {dogs.map((dog) => (
              <div
                key={dog.name}
                className="rounded-2xl glass p-7 text-center shadow-petal"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-wood/10">
                  <PawPrint className="h-7 w-7 text-wood" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">{dog.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-wood">{dog.breed}</p>
                <p className="mt-3 text-sm text-ink-soft">{dog.personality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}