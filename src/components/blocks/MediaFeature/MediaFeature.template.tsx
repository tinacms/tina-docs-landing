import { Template } from "tinacms";

export const MediaFeatureBlockSchema: Template = {
  name: "MediaFeature",
  label: "Media Feature",
  ui: {
    previewSrc: "/blocks/media-feature.png",
  },
  fields: [
    {
      name: "MediaBlock",
      label: "Media Block",
      type: "object",
      list: true,
      fields: [
        {
          name: "isMediaOnRight",
          type: "boolean",
          description: "On = Yes",
          label: "Is Media on Right?",
        },
        {
          name: "features",
          type: "object",
          label: "Features",
          list: true,
          ui: {
            min: 0,
            max: 2,
          },
          fields: [
            {
              name: "title",
              type: "string",
              label: "Title",
            },
            {
              name: "description",
              type: "rich-text",
              label: "Description",
            },
            {
              name: "link",
              type: "string",
              label: "Link",
            },
          ],
        },
        {
          name: "mediaContent",
          type: "object",
          label: "Media Content",
          list: true,
          ui: {
            min: 0,
            max: 1,
          },
          templates: [
            {
              name: "image",
              label: "Image",
              fields: [
                {
                  name: "image",
                  label: "Image",
                  type: "image",
                },
                {
                  name: "alt",
                  label: "Alt Text",
                  type: "string",
                },
              ],
            },
            {
              name: "youtubeVideo",
              label: "YouTube Video",
              fields: [
                {
                  name: "videoSrc",
                  label: "YouTube Video Source",
                  type: "string",
                },
                {
                  name: "thumbnail",
                  label: "Thumbnail",
                  type: "image",
                },
                {
                  name: "alt",
                  label: "Alt Text",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
