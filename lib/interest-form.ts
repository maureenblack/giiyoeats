export type InterestForm =
  | { configured: false }
  | { configured: true; embedUrl: string; openUrl: string };

const FORM_HOST = "docs.google.com";

/**
 * Public form URL for "Open form in a new tab".
 * Removes only the query parameter embedded=true. Other parameters stay.
 */
export function openFormUrl(embedUrl: string): string {
  const url = new URL(embedUrl);
  const kept = new URLSearchParams();
  for (const [key, value] of url.searchParams) {
    if (key === "embedded" && value === "true") continue;
    kept.append(key, value);
  }
  url.search = kept.toString();
  return url.toString();
}

export function resolveInterestForm(
  raw: string | undefined | null,
): InterestForm {
  if (typeof raw !== "string") return { configured: false };
  const value = raw.trim();
  if (!value) return { configured: false };

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { configured: false };
  }

  const isGoogleForm =
    url.protocol === "https:" &&
    url.hostname === FORM_HOST &&
    (url.pathname === "/forms" || url.pathname.startsWith("/forms/"));

  if (!isGoogleForm) return { configured: false };

  return {
    configured: true,
    embedUrl: value,
    openUrl: openFormUrl(value),
  };
}
