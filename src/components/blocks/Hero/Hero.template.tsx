import { Template } from "tinacms";

export const actionsButtonTemplateFields = {
  fields: [
    { name: "label", label: "Label", type: "string" },
    {
      name: "variant",
      label: "Variant",
      type: "string",
      options: [
        { value: "default", label: "default" },
        { value: "destructive", label: "Destructive" },
        { value: "outline", label: "Outline" },
        { value: "secondary", label: "Secondary" },
        { value: "ghost", label: "Ghost" },
        { value: "link", label: "Link" },
      ],
    },
    {
      name: "arrow",
      label: "Arrow",
      type: "boolean",
    },
    {
      name: "size",
      label: "Size",
      type: "string",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ],
    },
    { name: "url", label: "URL", type: "string" },
  ],
};

export const actionsButtonTemplate = {
  label: "Actions",
  name: "actions",
  type: "object",
  list: true,
  ui: {
    itemProps: (item: any) => {
      return { label: item?.label };
    },
    defaultItem: {
      variant: "default",
      label: "Secondary Action",
      size: "medium",
      url: "/",
    },
  },
  fields: actionsButtonTemplateFields.fields,
};

export const codeButtonTemplate = {
  label: "Code Button",
  name: "codeButton",
  type: "object",
  list: true,
  ui: {
    itemProps: (item: any) => {
      return { label: item?.label };
    },
  },
  fields: [{ name: "label", label: "Label", type: "string" }],
};

export const HeroTemplate: Template = {
  name: "Hero",
  label: "Hero",
  fields: [
    { name: "title", type: "string", label: "Title" },
    {
      name: "tagline",
      type: "string",
      label: "Tagline",
      ui: { component: "textarea" },
    },
    {
      label: "Actions",
      list: true,
      name: "actions",
      type: "object",
      ui: {
        visualSelector: true,
      },
      templates: [
        actionsButtonTemplate as Template,
        codeButtonTemplate as Template,
      ],
    },
  ],
};
