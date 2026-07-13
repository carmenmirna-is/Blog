import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function Novelas() {
  const section = sections.find((s) => s.id === "novelas");
  return <ArticleGridPage section={section} />;
}