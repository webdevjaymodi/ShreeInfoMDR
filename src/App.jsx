import { useEffect } from "react";
import { StaticPage } from "./components/StaticPage";
import { initPageEnhancements } from "./enhancements";

export default function App() {
  useEffect(() => {
    return initPageEnhancements();
  }, []);

  return <StaticPage />;
}
