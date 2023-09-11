import { isAdmin } from '../access/admins';
import { CollectionConfig } from '../payload/collections/config/types';
import { CATEGORY_TRANSLATION } from '../translate';
import { MediaCollection } from './media.collection';

export const CategoriesCollection: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'category_name',
  },
  labels: { singular: CATEGORY_TRANSLATION.category, plural: CATEGORY_TRANSLATION.category },
  fields: [
    {
      name: 'parent_categories',
      label: CATEGORY_TRANSLATION.parent_category,
      type: 'relationship',
      relationTo: 'categories',
    },
    { name: 'category_name', label: CATEGORY_TRANSLATION.category_name, type: 'text', required: true },
    { name: 'category_description', label: CATEGORY_TRANSLATION.category_description, type: 'textarea' },
    { name: 'category_color', label: CATEGORY_TRANSLATION.category_color, type: 'text' },
    { name: 'category_icon', label: CATEGORY_TRANSLATION.category_icon, type: 'upload', relationTo: MediaCollection.slug },
    { name: 'category_image', label: CATEGORY_TRANSLATION.category_image, type: 'upload', relationTo: MediaCollection.slug },
  ],
  access: {
    read: () => true,
    create: () => true,
    update:  () => true,
    delete:  isAdmin,
  },
};
