import type { Collection } from "tinacms";
import { HeroBlockSchema } from "@/components/blocks/Hero/Hero.template";
import { contentBlockSchema } from "@/components/blocks/content";
import { testimonialBlockSchema } from "@/components/blocks/testimonial";
import { featureBlockSchema } from "@/components/blocks/features";
import { videoBlockSchema } from "@/components/blocks/video";
import { calloutBlockSchema } from "@/components/blocks/callout";
import { statsBlockSchema } from "@/components/blocks/stats";
import { ctaBlockSchema } from "@/components/blocks/call-to-action";
import { SeoInformation } from "./seo";
import { BannerSchema } from "@/src/components/blocks/Banner/Banner.template";
import { MediaFeatureBlockSchema } from "@/src/components/blocks/MediaFeature/MediaFeature.template";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    },
  },
  fields: [
    SeoInformation as any,
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        HeroBlockSchema,
        BannerSchema,
        MediaFeatureBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,

      ],
    },
  ],
};

export default Page;
