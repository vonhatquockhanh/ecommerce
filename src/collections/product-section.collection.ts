import { CollectionConfig } from '../payload/collections/config/types';
import { PRODUCT_TRANSLATION } from '../translate';

export const ProductSectionCollection: CollectionConfig = {
  slug: 'product_sections',
  labels: { singular: PRODUCT_TRANSLATION.product_section, plural: PRODUCT_TRANSLATION.product_section },
  admin: {
    useAsTitle: 'product_section_title',
  },
  fields: [
    { name: 'product_section_title', label: PRODUCT_TRANSLATION.product_section_title, type: 'text', required: true },
    { name: 'product_section_description', label: PRODUCT_TRANSLATION.product_section_description, type: 'textarea', required: false },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
};
