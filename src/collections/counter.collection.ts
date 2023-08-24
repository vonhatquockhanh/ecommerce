import { CollectionConfig } from '../payload/collections/config/types';

export const CounterCollection: CollectionConfig = {
  slug: 'counter',
  admin: {
    useAsTitle: 'counter',
  },
  fields: [
    {
      name: 'collection_name',
      type: 'text',
    },
    {
      name: 'seq',
      type: 'number',
    },
  ],
  access: {
    read: () => false,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
};
