export function getStrapiURL(path = "") {
  const url = import.meta.env.DEV
    ? process.env.STRAPI_API_URL_DEV
    : process.env.STRAPI_API_URL_PROD;

  const fallbackUrl = import.meta.env.DEV
    ? "http://localhost:1337"
    : "https://api.alemazung.de";

  return `${url || fallbackUrl}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
