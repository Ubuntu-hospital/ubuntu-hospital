export function buildWhatsAppUrl(baseUrl: string, content: string) {
  const trimmedMessage = content.trim();

  if (!trimmedMessage) {
    return "";
  }

  const separator = baseUrl.includes("?") ? "&" : "?";

  return `${baseUrl}${separator}text=${encodeURIComponent(trimmedMessage)}`;
}
