import {
  Home, BookOpen, PenLine, Cpu, BarChart3, Globe2, Newspaper,
  Cake, Music2, BookMarked, Flower2, Dog, Sprout, User, Mail,
} from "lucide-react";

export const sections = [
  { id: "inicio", path: "/", label: "Inicio", icon: Home, accent: "sage", tagline: "El umbral de la casa", description: "La entrada a este pequeño rincón.", showOnHome: false },
  { id: "biblioteca", path: "/biblioteca", label: "Biblioteca", icon: BookOpen, accent: "wood", tagline: "Estantes con historia", description: "Los libros que marcaron una idea o una temporada." },
  { id: "blog", path: "/blog", label: "Blog", icon: PenLine, accent: "rose", tagline: "Notas al margen", description: "Reflexiones sueltas, sin calendario editorial." },
  { id: "tecnologia", path: "/tecnologia", label: "Tecnología", icon: Cpu, accent: "lavender", tagline: "El taller detrás de la puerta", description: "Experimentos y aprendizajes de cómo se construyen las cosas." },
  { id: "ingenieria-de-datos", path: "/ingenieria-de-datos", label: "Ingeniería de Datos", icon: BarChart3, accent: "sage-deep", tagline: "Los ríos invisibles", description: "Cómo se ordena y cuida la información." },
  { id: "sociedad", path: "/sociedad", label: "Sociedad", icon: Globe2, accent: "rose", tagline: "Miradas compartidas", description: "Ideas sobre cómo vivimos juntos." },
  { id: "investigacion", path: "/investigacion", label: "Investigación", icon: Newspaper, accent: "wood", tagline: "Preguntas con método", description: "Notas de estudio y procesos en curso." },
  { id: "proyecto-cafeteria", path: "/proyecto-cafeteria", label: "Proyecto Cafetería", icon: Cake, accent: "rose", tagline: "Un sueño con aroma a café", description: "La bitácora de construir un lugar real." },
  { id: "playlist", path: "/playlist", label: "Playlist", icon: Music2, accent: "lavender", tagline: "La banda sonora de escribir", description: "Canciones para leer, programar o simplemente estar." },
  { id: "novelas", path: "/novelas", label: "Novelas", icon: BookMarked, accent: "wood", tagline: "Mundos en construcción", description: "Ficción larga, capítulo a capítulo." },
  { id: "poemas", path: "/poemas", label: "Poemas", icon: Flower2, accent: "rose", tagline: "Versos breves", description: "Lo que no cabe en un párrafo." },
  { id: "mis-perros", path: "/mis-perros", label: "Mis Perros", icon: Dog, accent: "sage", tagline: "La compañía de siempre", description: "Historias de quienes hacen compañía sin pedir nada." },
  { id: "diario", path: "/diario", label: "Diario", icon: Sprout, accent: "sage", tagline: "Cuaderno abierto", description: "Entradas breves y honestas, casi en tiempo real." },
  { id: "sobre-mi", path: "/sobre-mi", label: "Sobre mí", icon: User, accent: "wood", tagline: "Quién cuida este rincón", description: "Una presentación honesta de quién soy." },
  { id: "contacto", path: "/contacto", label: "Contacto", icon: Mail, accent: "sage-deep", tagline: "Toca la campanilla", description: "Un espacio para escribir o saludar." },
];

export const homeSections = sections.filter((s) => s.showOnHome !== false);