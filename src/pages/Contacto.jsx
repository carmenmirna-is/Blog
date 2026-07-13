import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { sections } from "../data/sections";

export default function Contacto() {
  const section = sections.find((s) => s.id === "contacto");
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHeader section={section} />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-xl px-6">
          <div className="rounded-2xl glass p-8 shadow-petal">
            {sent ? (
              <p className="text-center text-ink">
                ¡Gracias por escribir! Suelo responder en un par de días. 🌿
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-ink">Nombre</label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-ink-soft/20 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-ink">Correo</label>
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-ink-soft/20 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-ink">Mensaje</label>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-ink-soft/20 px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}