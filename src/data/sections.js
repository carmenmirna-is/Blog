import {
  Home,
  BookOpen,
  PenLine,
  Music2,
  Sprout,
  Dog,
  User,
  Mail,
} from "lucide-react";

export const sections = [
  {
    id: "inicio",
    path: "/",
    label: "Inicio",
    icon: Home,
    accent: "sage",
    tagline: "El umbral de la casa",
    description: "La entrada a este pequeño rincón.",
    showOnHome: false,
  },
  {
    id: "biblioteca",
    path: "/biblioteca",
    label: "Biblioteca",
    icon: BookOpen,
    accent: "wood",
    tagline: "Estantes con historia",
    description: "Los libros que marcaron una idea o una temporada.",
  },
  {
    id: "blog",
    path: "/blog",
    label: "Blog",
    icon: PenLine,
    accent: "rose",
    tagline: "Notas al margen",
    description: "Reflexiones, proyectos, novelas y poemas, todo en un solo lugar.",
  },
  {
    id: "playlist",
    path: "/playlist",
    label: "Playlist",
    icon: Music2,
    accent: "lavender",
    tagline: "La banda sonora de escribir",
    description: "Canciones para leer, programar o simplemente estar.",
  },
  {
    id: "diario",
    path: "/diario",
    label: "Diario",
    icon: Sprout,
    accent: "sage",
    tagline: "Cuaderno abierto",
    description: "Entradas breves y honestas, casi en tiempo real.",
  },
  {
    id: "mis-perros",
    path: "/mis-perros",
    label: "Mis Perros",
    icon: Dog,
    accent: "gold",
    tagline: "La compañía de siempre",
    description: "Historias de quienes hacen compañía sin pedir nada.",
  },
  {
    id: "sobre-mi",
    path: "/sobre-mi",
    label: "Sobre mí",
    icon: User,
    accent: "wood",
    tagline: "Quién cuida este rincón",
    description: "Una presentación honesta de quién soy.",
  },
  {
    id: "contacto",
    path: "/contacto",
    label: "Contacto",
    icon: Mail,
    accent: "sage-deep",
    tagline: "Toca la campanilla",
    description: "Un espacio para escribir o saludar.",
  },
];

export const homeSections = sections.filter((s) => s.showOnHome !== false);

export const getSectionByPath = (path) =>
  sections.find((s) => s.path === path);