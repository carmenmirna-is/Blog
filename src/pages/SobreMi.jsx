import PageHeader from "../components/layout/PageHeader";
import { sections } from "../data/sections";

export default function SobreMi() {
  const section = sections.find((s) => s.id === "sobre-mi");

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-sage/30 via-rose/30 to-lavender/30">
            <span className="font-display text-4xl text-wood">✿</span>
          </div>
          <p className="text-ink-soft">
            Trabajo con tecnología y datos durante el día, escribo y leo
            durante la noche, y sueño con una cafetería con estantes propios
            desde hace bastante tiempo. Este sitio es el lugar donde esas
            partes conviven sin tener que elegir una sola.
          </p>
          <div className="mt-8 flex justify-center">
            <CafeCorner />
          </div>
        </div>
      </section>
    </>
  );
}