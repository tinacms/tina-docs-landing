import { Template } from "tinacms";

export const LogoGridBlockSchema: Template = {
  name: "LogoGrid",
  label: "Logo Grid",
  ui: {
    previewSrc: "/blocks/logo-grid.png",
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
      type: "object",
      list: true,
      ui: {
        min: 1,
        max: 10,
        itemProps: (item) => {
          return {
            label: item.alt,
          };
        },
      },
      fields: [
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
        {
          name: "image",
          label: "Image",
          type: "image",
        },
      ],
    },
  ],
};
