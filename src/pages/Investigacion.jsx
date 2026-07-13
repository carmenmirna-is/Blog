import ArticleGridPage from "./templates/ArticleGridPage";
import { sections } from "../data/sections";

export default function Investigacion() {
  const section = sections.find((s) => s.id === "investigacion");
  return <ArticleGridPage section={section} />;
}