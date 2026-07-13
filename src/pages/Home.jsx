import Hero from "../components/sections/Hero";
import { homeSections } from "../data/sections";
import SectionCard from "../components/ui/SectionCard";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="min-h-screen bg-cream dark:bg-night p-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeSections.map((section, index) => (
            <SectionCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}