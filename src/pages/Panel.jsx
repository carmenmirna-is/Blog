import { useState } from "react";
import { Link } from "react-router-dom";
import { PenLine, Music2 } from "lucide-react";
import { isAdminAuthorized, setAdminAuthorized } from "../lib/adminAuth";

const ADMIN_PASSWORD = "tu-contraseña-secreta-aquí"; // la misma de siempre

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
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md rounded-2xl bg-paper/80 p-8 text-center shadow-petal">
        <h1 className="mb-2 font-display text-2xl font-semibold text-ink">
          Panel de escritura
        </h1>
        <p className="mb-8 text-sm text-ink-soft">¿Qué quieres hacer?</p>

        <div className="flex flex-col gap-4">
          <Link
            to="/escribir"
            className="flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]"
          >
            <PenLine className="h-4 w-4" strokeWidth={1.75} />
            Escribir una entrada
          </Link>

          <Link
            to="/escribir-playlist"
            className="flex items-center justify-center gap-2 rounded-full bg-lavender-deep px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]"
          >
            <Music2 className="h-4 w-4" strokeWidth={1.75} />
            Agregar canción a la playlist
          </Link>
        </div>
      </div>
    </div>
  );
}