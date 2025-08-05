import { iconOptions } from "@/src/constants";
import { Template } from "tinacms";

export const CallToActionBlockSchema: Template = {
  name: "CallToAction",
  label: "Call to Action",
  ui: {},
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Actions",
      name: "actions",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          label: "Icon",
          name: "selectedIcon",
          options: iconOptions,
        },
      ],
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
    },
  ],
};
