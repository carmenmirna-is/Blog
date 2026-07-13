import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function Biblioteca() {
  const section = sections.find((s) => s.id === "biblioteca");
  return <ArticleGridPage section={section} />;
}