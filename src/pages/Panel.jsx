import { useState } from "react";
import { Link } from "react-router-dom";
import { PenLine, Music2 } from "lucide-react";
import { isAdminAuthorized, setAdminAuthorized } from "../lib/adminAuth";

const ADMIN_PASSWORD = "shawnmendes98"; // la misma de siempre

const options = [
  {
    to: "/escribir",
    icon: PenLine,
    tagline: "Nueve secciones te esperan",
    title: "Escribir una entrada",
    description: "Comparte un ensayo, una reseña, un capítulo de novela o cualquier reflexión.",
    accent: "sage",
  },
  {
    to: "/escribir-playlist",
    icon: Music2,
    tagline: "Sube un mp3 o pega un link",
    title: "Agregar canción",
    description: "Suma una canción a la playlist, subiendo tu propio audio o enlazando Spotify/YouTube.",
    accent: "lavender",
  },
];

export default function Panel() {
  const [authorized, setAuthorized] = useState(isAdminAuthorized());
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAdminAuthorized();
      setAuthorized(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl bg-paper/80 p-8 shadow-petal">
          <h1 className="mb-4 text-center font-display text-2xl font-semibold text-ink">
            Acceso privado
          </h1>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            autoFocus
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-32">
      <div className="w-full max-w-3xl">
        <h1 className="mb-2 text-center font-display text-3xl font-semibold text-ink">
          Panel de escritura
        </h1>
        <p className="mb-10 text-center text-sm text-ink-soft">¿Qué quieres hacer hoy?</p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Link
            to="/escribir"
            className="group block rounded-2xl border border-white/60 bg-paper/80 p-7 shadow-petal transition-all duration-300 hover:-translate-y-1 hover:shadow-petal-lg"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
            <PenLine className="h-5 w-5 text-sage-deep" strokeWidth={1.75} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-sage-deep">
            Nueve secciones te esperan
            </p>
            <h3 className="font-display text-2xl font-semibold text-ink">Escribir una entrada</h3>
            <p className="mt-2 text-sm text-ink-soft">
            Comparte un ensayo, una reseña, un capítulo de novela o cualquier reflexión.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-forest opacity-0 transition-opacity group-hover:opacity-100">
            Ir →
            </span>
        </Link>

        <Link
            to="/escribir-playlist"
            className="group block rounded-2xl border border-white/60 bg-paper/80 p-7 shadow-petal transition-all duration-300 hover:-translate-y-1 hover:shadow-petal-lg"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lavender/20">
            <Music2 className="h-5 w-5 text-lavender-deep" strokeWidth={1.75} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-lavender-deep">
            Sube un mp3 o pega un link
            </p>
            <h3 className="font-display text-2xl font-semibold text-ink">Agregar canción</h3>
            <p className="mt-2 text-sm text-ink-soft">
            Suma una canción a la playlist, subiendo tu propio audio o enlazando Spotify/YouTube.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-forest opacity-0 transition-opacity group-hover:opacity-100">
            Ir →
            </span>
        </Link>
        </div>
      </div>
    </div>
  );
}