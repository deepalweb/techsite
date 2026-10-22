export const seoLocales = ["en", "si", "ta"];

export function localeFromPath(pathname = "/") {
  const match = pathname.match(/^\/(si|ta)(?:\/|$)/);
  return match ? match[1] : "en";
}

export function pagePathFromPathname(pathname = "/") {
  const locale = localeFromPath(pathname);
  const withoutLocale = locale === "en" ? pathname : pathname.replace(/^\/(si|ta)(?=\/|$)/, "") || "/";
  return withoutLocale.replace(/\/+$/, "") || "/";
}

export function localizedPath(locale, page = "/") {
  const [pagePart, ...hashParts] = page.split("#");
  const hash = hashParts.length ? `#${hashParts.join("#")}` : "";
  const normalized = pagePart.replace(/\/+$/, "") || "/";
  let base;
  if (locale === "en") base = normalized === "/" ? "/" : `${normalized}/`;
  else base = normalized === "/" ? `/${locale}/` : `/${locale}${normalized}/`;
  return `${base}${hash}`;
}

export function canonicalUrl(locale, page = "/") {
  return `https://www.drtech.lk${localizedPath(locale, page)}`;
}
