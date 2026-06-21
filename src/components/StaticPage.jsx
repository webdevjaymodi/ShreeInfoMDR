import { pageMarkup } from "../data/pageMarkup";

export function StaticPage() {
  return <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />;
}
