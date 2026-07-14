import Hero from "../components/sections/Hero";
import Divider from "../components/ui/Divider";
import { homeSections } from "../data/sections";
import SectionCard from "../components/ui/SectionCard";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="bg-cream px-6 py-10 dark:bg-night sm:px-8">
        <Divider symbol="❦" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeSections.map((section, index) => (
            <SectionCard key={section.id} section={section} index={index} />
          ))}
        </div>

        <Divider symbol="✦" />
      </div>
    </>
  );
}