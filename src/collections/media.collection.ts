import { CollectionConfig } from '../payload/collections/config/types';
import { MEDIA_TRANSLATION } from '../translate';

export const MediaCollection: CollectionConfig = {
  slug: 'media',
  labels: { singular: MEDIA_TRANSLATION.media, plural: MEDIA_TRANSLATION.media },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 768,
        height: 1024,
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
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [{ name: 'alt', label: 'Alt Text', type: 'text' }],
  access: {
    read: () => true,
    create: () => true,
    update:  () => true,
    delete:  () => true,
  },
};

