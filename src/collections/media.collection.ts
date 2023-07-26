import { CollectionConfig } from '../payload/collections/config/types';

export const MediaCollection: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [{ name: 'alt', label: 'Alt Text', type: 'text' }],
  access: {
    read: ({ req: { user } }) => {

      // users who are authenticated will see all posts
      // if (user) {
      //   return true;
      // }

      // query publishDate to control when posts are visible to guests
      return {
        // and: [
        //   {
        //     publishDate: {
        //       less_than: new Date().toJSON(),
        //     },
        //     _status: {
        //       equals: 'published',
        //     },
        //   },
        // ],
      };
    },
  },
};

