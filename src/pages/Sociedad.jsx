import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function Sociedad() {
  const section = sections.find((s) => s.id === "sociedad");
  return <ArticleGridPage section={section} />;
}