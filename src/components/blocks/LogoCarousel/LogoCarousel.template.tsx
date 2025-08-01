import { Template } from "tinacms";

export const LogoCarouselBlockSchema: Template = {
  name: "LogoCarousel",
  label: "Logo Carousel",
  ui: {
    previewSrc: "/blocks/logo-carousel.png",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "logos",
      label: "Logos",
      type: "image",
      list: true,
    
    },
  ],
};