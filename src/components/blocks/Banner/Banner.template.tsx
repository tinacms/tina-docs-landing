export const BannerSchema = {
  name: "Banner",
  label: "Banner",
  ui: {
    previewSrc: '/blocks/banner.png',
  },
  fields: [
    {
        name: 'quote',
        label: 'Quote',
        type: 'string',
        ui: {component: 'textarea'}
    },
    {
        name: 'author',
        label: 'Author',
        type: 'string',
    },
    {
        name: 'authorInfo',
        label: 'Author Information',
        description: 'Information such as title, company, etc.',
        type: 'string',
    },
    {
        name: 'image',
        label: 'Image',
        type: 'image',
    }
  ],
};