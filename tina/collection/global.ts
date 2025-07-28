import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";
import { buttonVariantsArray } from "@/src/components/ui/button";

const navLink = 
{
  name: 'navLink',
  label: 'Nav Link',
  type: 'object',
  ui: {
    itemProps: (item: any) => {
      return { label: item?.label };
    },
  },
  fields: [
    {
      name: 'href',
      type: 'string',
      label: 'Link',
    },
    {
      name: 'label',
      type: 'string',
      label: 'Label',
    }
  ]
}

const navDropdown = {
  name: 'navDropdown',
  label: 'Nav Dropdown',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', label: 'Label' },
    { name: 'links', type: 'object', label: 'Links', list: true, fields: [navLink] },
  ]
}

const searchBar = {
  name: 'searchBar',
  label: 'Search Bar',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', label: 'Label' },
  ]
}

const githubButton = {
  name: 'githubButton',
  label: 'Github Button',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', label: 'Label' },
  ]
}

const ctaButton = { 
  name: 'ctaButton',
  label: 'CTA Button',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', label: 'Label' },
    { name: 'url', type: 'string', label: 'URL' },
    { name: 'variant', type: 'string', label: 'Variant', options: buttonVariantsArray },
  ]
}

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
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
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
          ]
        }
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.icon?.name || 'undefined' };
            },
          },
          fields: [
            iconSchema as any,
            {
              type: "string",
              label: "Url",
              name: "url",
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
