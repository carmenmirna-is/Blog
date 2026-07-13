import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function Poemas() {
  const section = sections.find((s) => s.id === "poemas");
  return <ArticleGridPage section={section} />;
}