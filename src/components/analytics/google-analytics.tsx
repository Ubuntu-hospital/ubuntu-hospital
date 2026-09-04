import Script from "next/script";

export default function GoogleAnalytics({ gaId }: { gaId?: string | null }) {
  if (!gaId || !gaId.trim() || !gaId.startsWith("G-")) {
    return null;
  }

  const trimmedId = gaId.trim();

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trimmedId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trimmedId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
