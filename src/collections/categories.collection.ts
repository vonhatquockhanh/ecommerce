import { CollectionConfig } from '../payload/collections/config/types';
import { MediaCollection } from './media.collection';

export const CategoriesCollection: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'category_name',
  },
  labels: { singular: 'Categories', plural: 'Categories' },
  fields: [
    {
      name: 'parent_categories',
      label: 'Parent Categories',
      type: 'relationship',
      relationTo: 'categories',
    },
    { name: 'category_name', label: 'Category Name', type: 'text', required: true },
    { name: 'category_description', label: 'Category Description', type: 'textarea' },
    { name: 'category_image', label: 'Category Image', type: 'upload', relationTo: MediaCollection.slug },
  ],
  access: {
    read: () => true,
    create: () => true,
    update:  () => true,
    delete:  () => true,
  },
};
