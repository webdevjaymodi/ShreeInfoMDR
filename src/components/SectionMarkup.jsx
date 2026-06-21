export function SectionMarkup({ markup }) {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
