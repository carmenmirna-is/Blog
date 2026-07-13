import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function Blog() {
  const section = sections.find((s) => s.id === "blog");
  return <ArticleGridPage section={section} />;
}