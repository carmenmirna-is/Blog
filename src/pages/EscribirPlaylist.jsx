import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ADMIN_PASSWORD = "shawnmendes98"; // la misma que usas en Escribir.jsx

export default function EscribirPlaylist() {
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [status, setStatus] = useState(null);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    mood: "",
    source_type: "upload",
    media_url: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) setAuthorized(true);
    else alert("Contraseña incorrecta");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalMediaUrl = form.media_url;

    if (form.source_type === "upload") {
      if (!file) {
        alert("Selecciona un archivo de audio");
        return;
      }
      setStatus("uploading");
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("post-media")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        setStatus("error");
        return;
      }

      const { data } = supabase.storage.from("post-media").getPublicUrl(filePath);
      finalMediaUrl = data.publicUrl;
    }

    setStatus("sending");
    const { error } = await supabase.from("playlist_tracks").insert([
      { ...form, media_url: finalMediaUrl },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ title: "", artist: "", mood: "", source_type: "upload", media_url: "" });
      setFile(null);
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
          <button type="submit" className="mt-4 w-full rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  const isBusy = status === "uploading" || status === "sending";

  return (
    <div className="min-h-screen bg-cream px-6 py-16">
      <div className="mx-auto max-w-xl rounded-2xl bg-paper/80 p-8 shadow-petal">
        <h1 className="mb-6 font-display text-2xl font-semibold text-ink">
          Agregar canción a la playlist
        </h1>

        {status === "success" && (
          <p className="mb-4 rounded-lg bg-sage/15 px-4 py-3 text-sm text-sage-deep">
            ¡Canción agregada!
          </p>
        )}
        {status === "error" && (
          <p className="mb-4 rounded-lg bg-rose/15 px-4 py-3 text-sm text-rose-deep">
            Hubo un error. Revisa la consola (F12).
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Artista</label>
            <input
              name="artist"
              value={form.artist}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Estado de ánimo</label>
            <input
              name="mood"
              value={form.mood}
              onChange={handleChange}
              placeholder="Para leer, para escribir…"
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Origen</label>
            <select
              name="source_type"
              value={form.source_type}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
            >
              <option value="upload">Subir mi propio archivo de audio</option>
              <option value="spotify">Link de Spotify</option>
              <option value="youtube">Link de YouTube</option>
            </select>
          </div>

          {form.source_type === "upload" ? (
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Archivo de audio</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files[0] ?? null)}
                className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink file:mr-3 file:rounded-full file:border-0 file:bg-sage/20 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-sage-deep"
              />
              {file && <p className="mt-1 text-xs text-ink-soft">Seleccionado: {file.name}</p>}
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">
                Pega el link de {form.source_type === "spotify" ? "Spotify" : "YouTube"}
              </label>
              <input
                name="media_url"
                value={form.media_url}
                onChange={handleChange}
                required
                placeholder={
                  form.source_type === "spotify"
                    ? "https://open.spotify.com/track/..."
                    : "https://www.youtube.com/watch?v=..."
                }
                className="w-full rounded-lg border border-ink-soft/20 bg-paper px-3 py-2 text-sm text-ink"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isBusy}
            className="w-full rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream disabled:opacity-50"
          >
            {status === "uploading" && "Subiendo audio…"}
            {status === "sending" && "Guardando…"}
            {!isBusy && "Agregar canción"}
          </button>
        </form>
      </div>
    </div>
  );
}