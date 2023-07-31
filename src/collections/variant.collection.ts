import { CollectionConfig } from '../payload/collections/config/types';

export const VariantCollection: CollectionConfig = {
  slug: 'variant',
  admin: {
    useAsTitle: 'variant_description',
  },
  fields: [
    { name: 'variant_description', label: 'Variant description', type: 'text', required: true },
    {
      name: 'variant_optionality',
      label: 'Variant Optionality',
      type: 'array',
      fields: [
        {
          name: 'optional_type',
          label: 'Optional Type',
          type: 'select',
          required: true,
          options: [
            { value: 'color', label: 'Color' },
            { value: 'size', label: 'Size' },
            { value: 'material', label: 'Material' }, 
            { value: 'style', label: 'Style' }, 
          ],
        },
        {
          name: 'optional_value',
          type: 'text',
          label: 'Optional Value',
          required: true,
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update:  () => true,
    delete:  () => true,
  },
};

