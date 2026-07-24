import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PenLine, Music2, Sprout, PawPrint } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Panel() {
  const navigate = useNavigate();

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setAuthorized(true);
      }

      setLoading(false);
    }

    checkSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    setAuthorized(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthorized(false);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-ink">Cargando...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-paper/80 p-8 shadow-petal"
        >
          <h1 className="mb-6 text-center font-display text-2xl font-semibold text-ink">
            Acceso privado
          </h1>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            autoFocus
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream transition hover:opacity-90"
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

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink">
              Panel de escritura
            </h1>

            <p className="mt-2 text-sm text-ink-soft">
              ¿Qué quieres hacer hoy?
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-ink-soft/20 px-5 py-2 text-sm font-medium text-ink transition hover:bg-paper"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <Link
            to="/escribir"
            className="group block rounded-2xl border border-white/60 bg-paper/80 p-7 shadow-petal transition-all duration-300 hover:-translate-y-1 hover:shadow-petal-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
              <PenLine
                className="h-5 w-5 text-sage-deep"
                strokeWidth={1.75}
              />
            </div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-sage-deep">
              Nueve secciones te esperan
            </p>

            <h3 className="font-display text-2xl font-semibold text-ink">
              Escribir una entrada
            </h3>

            <p className="mt-2 text-sm text-ink-soft">
              Comparte un ensayo, una reseña, un capítulo de novela o cualquier
              reflexión.
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
              <Music2
                className="h-5 w-5 text-lavender-deep"
                strokeWidth={1.75}
              />
            </div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-lavender-deep">
              Sube un mp3 o pega un link
            </p>

            <h3 className="font-display text-2xl font-semibold text-ink">
              Agregar canción
            </h3>

            <p className="mt-2 text-sm text-ink-soft">
              Suma una canción a la playlist, subiendo tu propio audio o enlazando
              YouTube.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-forest opacity-0 transition-opacity group-hover:opacity-100">
              Ir →
            </span>
          </Link>

          <Link
            to="/escribir-diario"
            className="group block rounded-2xl border border-white/60 bg-paper/80 p-7 shadow-petal transition-all duration-300 hover:-translate-y-1 hover:shadow-petal-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
              <Sprout className="h-5 w-5 text-wood" strokeWidth={1.75} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-wood">
              Público o privado
            </p>
            <h3 className="font-display text-2xl font-semibold text-ink">
              Escribir en el diario
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Anota una entrada breve, y decide si la comparte el mundo o solo tú.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-forest opacity-0 transition-opacity group-hover:opacity-100">
              Ir →
            </span>
          </Link>

          <Link
            to="/escribir-perro"
            className="group block rounded-2xl border border-white/60 bg-paper/80 p-7 shadow-petal transition-all duration-300 hover:-translate-y-1 hover:shadow-petal-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wood/15">
              <PawPrint className="h-5 w-5 text-wood" strokeWidth={1.75} />
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-wood">
              La compañía de siempre
            </p>
            <h3 className="font-display text-2xl font-semibold text-ink">
              Agregar un perrito
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Comparte el nombre, raza y personalidad de tu compañía de cuatro patas.
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