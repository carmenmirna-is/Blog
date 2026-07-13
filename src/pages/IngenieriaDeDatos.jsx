import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function IngenieriaDeDatos() {
  const section = sections.find((s) => s.id === "ingenieria-de-datos");
  return <ArticleGridPage section={section} />;
}