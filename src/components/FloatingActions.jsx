import { backToTopMarkup, whatsappFloatMarkup } from "../data/sections";
import { SectionMarkup } from "./SectionMarkup";

export function FloatingActions() {
  return (
    <>
      <SectionMarkup markup={whatsappFloatMarkup} />
      <SectionMarkup markup={backToTopMarkup} />
    </>
  );
}
