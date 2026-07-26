import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useScrolled from "../../hooks/useScrolled";
import { sections } from "../../data/sections";
import ThemeToggle from "../ui/ThemeToggle";

const primaryIds = ["biblioteca", "blog", "playlist", "diario", "mis-perros"];
const primaryLinks = sections.filter((s) => primaryIds.includes(s.id));
const aboutLink = sections.find((s) => s.id === "sobre-mi");
const contactLink = sections.find((s) => s.id === "contacto");

export default function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkColor = scrolled
    ? "text-ink-soft hover:text-forest"
    : "text-cream/90 hover:text-cream";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-4 pb-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-deep shadow-petal-lg" : "bg-transparent"
        }`}
        >
          <Link
            to="/"
            className={`font-display text-xl font-semibold ${scrolled ? "text-ink" : "text-cream"}`}
          >
            El Rincón Encantado
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-6 lg:flex">
            {primaryLinks.map((s) => (
              <NavLink
                key={s.id}
                to={s.path}
                className={`link-underline text-sm font-semibold ${linkColor}`}
              >
                {s.label}
              </NavLink>
            ))}

            <NavLink
              to={aboutLink.path}
              className={`link-underline text-sm font-semibold ${linkColor}`}
            >
              {aboutLink.label}
            </NavLink>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle className={linkColor} />
            <Link
              to={contactLink.path}
              className="btn-primary px-5 py-2 text-sm"
            >
              Contacto
            </Link>
          </div>

          {/* Toggle + hamburguesa (solo móvil) */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle className={scrolled ? "text-ink" : "text-cream"} />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {mobileOpen ? (
                <X className={scrolled ? "text-ink" : "text-cream"} />
              ) : (
                <Menu className={scrolled ? "text-ink" : "text-cream"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="mt-3 px-6">
          <nav className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-2xl glass-deep p-4 shadow-petal-lg">
            {sections.map((s) => (
              <Link
                key={s.id}
                to={s.path}
                onClick={() => setMobileOpen(false)}
                className="link-underline rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-sage/15"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}