import { Link } from "react-router-dom";
import { sections } from "../../data/sections";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest px-6 py-14 text-cream shadow-petal-lg">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-8">
          <div className="mr-auto">
            <p className="font-display text-xl font-semibold">El Rincón Encantado</p>
            <p className="mt-2 max-w-xs text-sm text-cream/70">
              Un pequeño lugar donde compartir libros, ideas y café, con calma.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.path}
                className="text-sm text-cream/75 hover:text-cream"
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 border-t border-cream/10 pt-6 text-xs text-cream/60">
          © {year} El Rincón Encantado. Hecho con calma.
        </p>
      </div>
    </footer>
  );
}