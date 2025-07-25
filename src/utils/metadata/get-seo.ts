import type { Metadata } from "next";
import { DEFAULT_SEO } from "./default-seo";
import { envUrl } from "../env-url";
import { formatExcerpt } from "../format-excerpt";

interface DefaultProps {
  pageTitle: string;
  body: any;
}

export const getSeo = (seo: any, data?: DefaultProps): Metadata => {
  const excerpt = data ? formatExcerpt(data.body, 140) : "";

  const SEO = {
    title: seo?.title || `${data?.pageTitle} | TinaDocs`,
    description: seo?.description || `${excerpt}`,
    alternates: {
      canonical: envUrl(seo?.canonicalUrl),
    },
    openGraph: {
      title: seo?.title || `${data?.pageTitle} | TinaDocs`,
      url: envUrl(seo?.canonicalUrl),
      description: seo?.description || `${excerpt}`,
      images: [
        {
          ...(DEFAULT_SEO.openGraph?.images as any[])[0],
          url: seo?.ogImage || envUrl((DEFAULT_SEO.openGraph?.images as any[])?.[0]?.url),
        },
      ],
    },
  };

  return {
    ...DEFAULT_SEO,
    ...SEO,
  };
};
