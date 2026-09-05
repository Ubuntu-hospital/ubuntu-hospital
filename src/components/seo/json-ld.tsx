/**
 * Reusable JSON-LD script component for injecting Schema.org structured data.
 * Rendered on the server so search engine bots (Googlebot, Bingbot) and AI crawlers
 * can immediately parse it.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, any> | Array<Record<string, any>>;
}) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
