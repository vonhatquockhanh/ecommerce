import { CollectionConfig } from '../payload/collections/config/types';

export const ProductSectionCollection: CollectionConfig = {
  slug: 'product_sections',
  labels: { singular: 'Product Section', plural: 'Product Section' },
  admin: {
    useAsTitle: 'product_section_title',
  },
  fields: [
    { name: 'product_section_title', label: 'Product Section Title', type: 'text', required: true },
    { name: 'product_section_description', label: 'Product Section Description', type: 'textarea', required: false },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
};
