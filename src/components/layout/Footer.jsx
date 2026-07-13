import { Link } from "react-router-dom";
import { Camera, Video, Lock } from "lucide-react";
import { sections } from "../../data/sections";

export default function Footer() {
  const year = new Date().getFullYear();
  const footerLinks = sections.filter((s) => s.id !== "inicio");

  return (
    <footer className="bg-forest px-6 py-14 text-cream shadow-petal-lg">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-8">
          <div className="mr-auto">
            <p className="font-display text-xl font-semibold">El Rincón Encantado</p>
            <p className="mt-2 max-w-xs text-sm text-cream/70">
              Un pequeño lugar donde compartir libros, ideas y café, con calma.
            </p>
            <div className="mt-5 flex gap-3">
              
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
              >
                <Camera className="h-4 w-4" strokeWidth={1.75} />
              </a>
              
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
              >
                <Video className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap gap-4">
            {footerLinks.map((section) => (
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

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-cream/10 pt-6 sm:flex-row">
          <p className="text-xs text-cream/60">
            © {year} El Rincón Encantado. Hecho con calma.
          </p>
          <Link
            to="/panel"
            aria-label="Panel"
            className="text-cream/25 transition-colors hover:text-cream/60"
          >
            <Lock className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </footer>
  );
}