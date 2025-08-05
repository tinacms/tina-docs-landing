import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";
import { buttonVariantsArray } from "@/src/components/ui/button";

const navLink = {
  name: "navLink",
  label: "Nav Link",
  type: "object",
  ui: {
    itemProps: (item: any) => {
      return { label: `🔗 ${item?.label}` };
    },
  },
  fields: [
    {
      name: "href",
      type: "string",
      label: "Link",
    },
    {
      name: "label",
      type: "string",
      label: "Label",
    },
  ],
};

const navDropdown = {
  name: "navDropdown",
  label: "Nav Dropdown",
  type: "object",
  ui: {
    itemProps: (item: any) => {
      return { label: `📁 ${item?.label}` };
    },
  },
  fields: [
    { name: "label", type: "string", label: "Label" },
    {
      name: "links",
      type: "object",
      label: "Links",
      list: true,
      ui: {
        itemProps: (item: any) => {
          return { label: item?.label };
        },
      },
      fields: [
        { name: "link", type: "string", label: "Link" },
        { name: "label", type: "string", label: "Label" },
      ],
    },
  ],
};

const searchBar = {
  name: "searchBar",
  label: "Search Bar",
  type: "object",
  ui: {
    itemProps: (item: any) => {
      return { label: "🔍 Search Bar" };
    },
  },
  fields: [{ name: "label", type: "string", label: "Label" }],
};

const githubButton = {
  name: "githubButton",
  label: "Github Button",
  type: "object",
  ui: {
    itemProps: (item: any) => {
      return { label: "⭐ Github Button" };
    },
  },
  fields: [{ name: "label", type: "string", label: "Label" }],
};

const ctaButton = {
  name: "ctaButton",
  label: "CTA Button",
  type: "object",
  ui: {
    itemProps: (item: any) => {
      return { label: `🍌 ${item?.label}` };
    },
  },
  fields: [
    { name: "label", type: "string", label: "Label" },
    { name: "url", type: "string", label: "URL" },
    {
      name: "variant",
      type: "string",
      label: "Variant",
      options: buttonVariantsArray,
    },
  ],
};

const demoModalButton = {
  name: "demoModal",
  label: "Demo Modal Button",
  type: "object",
  ui: {
    itemProps: () => {
      return { label: `🔍 Demo Modal Button` };
    },
  },
  fields: [
    { name: "label", type: "string", label: "Label" },
    {
      name: "variant",
      type: "string",
      label: "Variant",
      options: buttonVariantsArray,
    },
  ],
};

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema as any,
        {
          name: "logo",
          type: "image",
          label: "Logo",
        },
        {
          type: "object",
          label: "Navigation Objects",
          name: "navObjects",
          list: true,
          templates: [
            navLink,
            navDropdown,
            searchBar,
            githubButton,
            ctaButton,
            demoModalButton,
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          name: "reservedText",
          label: "Reserved Text",
          type: "string",
          description:
            "This is the text that will be displayed at the bottom of the footer, usually used for the All Rights Reserved text",
        },
        {
          name: "lhs",
          type: "object",
          label: "Left Hand Side Content",
          fields: [
            { name: "logo", type: "image", label: "Logo" },
            { name: "subtext", type: "string", label: "Subtext" },
            {
              name: "button",
              type: "object",
              label: "Button",
              fields: [
                { name: "label", type: "string", label: "Label" },
                { name: "url", type: "string", label: "URL" },
              ],
            },
          ],
        },
        {
          name: "itemList",
          type: "object",
          label: "Item List",
          list: true,
          ui: {
            min: 0,
            max: 3,
            itemProps: (item: any) => {
              return { label: `📁 ${item?.title}` };
            },
          },
          fields: [
            { name: "title", type: "string", label: "Title" },
            {
              name: "links",
              type: "object",
              label: "Links",
              list: true,
              ui: {
                itemProps: (item: any) => {
                  return { label: item?.label };
                },
              },
              fields: [
                { name: "label", type: "string", label: "Label" },
                { name: "url", type: "string", label: "URL" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
