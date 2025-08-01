import { Template } from "tinacms";
import { iconOptions } from "../../../constants";

export const ContentGridSchema: Template = {
  name: "ContentGrid",
  label: "Content Grid",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "itemList",
      label: "Item List",
      type: "object",
      list: true,
      ui: {
        min: 0,
        max: 3,
        itemProps: (item) => ({
          label: item.title || "Item",
        }),
      },
      fields: [
        { name: "title", label: "title", type: "string" },
        { name: "subtext", label: "Subtext", type: "rich-text" },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          options: iconOptions
        },
        {
          name: "links",
          label: "Links",
          type: "object",
          fields: [
            { name: "label", label: "Label", type: "string" },
            { name: "url", label: "URL", type: "string" },
          ],
        },
      ],
    },
    {
      name: "image",
      label: "Image",
      type: "image",
    },
  ],
};
