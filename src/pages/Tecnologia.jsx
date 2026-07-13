import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function Tecnologia() {
  const section = sections.find((s) => s.id === "tecnologia");
  return <ArticleGridPage section={section} />;
}