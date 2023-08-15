import { CollectionConfig } from '../payload/collections/config/types';
import { VARIANT_TRANSLATION } from '../translate';

export const VariantCollection: CollectionConfig = {
  slug: 'variant',
  admin: {
    useAsTitle: 'variant_description',
  },
  labels: { singular: VARIANT_TRANSLATION.variant, plural: VARIANT_TRANSLATION.variant },
  fields: [
    { name: 'variant_description', label: VARIANT_TRANSLATION.variant_description, type: 'text', required: true },
    {
      name: 'variant_optionality',
      label: VARIANT_TRANSLATION.variant_optionality,
      type: 'array',
      fields: [
        {
          name: 'optional_type',
          label: VARIANT_TRANSLATION.optional_type,
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
          label: VARIANT_TRANSLATION.optional_value,
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

