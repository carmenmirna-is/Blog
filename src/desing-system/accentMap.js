/**
 * Traduce el nombre corto de un color de acento (guardado en data/sections.js)
 * a las clases reales de Tailwind. Se escriben completas y explícitas —no
 * armadas dinámicamente como `bg-${accent}`— porque Tailwind necesita ver
 * el nombre exacto de cada clase en el código para poder generarla.
 */
export const accentMap = {
  sage: {
    bgSoft: "bg-sage/20",
    text: "text-sage-deep",
  },
  "sage-deep": {
    bgSoft: "bg-sage-deep/15",
    text: "text-sage-deep",
  },
  rose: {
    bgSoft: "bg-rose/20",
    text: "text-rose-deep",
  },
  lavender: {
    bgSoft: "bg-lavender/20",
    text: "text-lavender-deep",
  },
  wood: {
    bgSoft: "bg-wood/15",
    text: "text-wood",
  },
};

export function getAccent(name) {
  return accentMap[name] ?? accentMap.sage;
}