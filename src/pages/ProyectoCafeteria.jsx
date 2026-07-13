import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function ProyectoCafeteria() {
  const section = sections.find((s) => s.id === "proyecto-cafeteria");
  return <ArticleGridPage section={section} />;
}