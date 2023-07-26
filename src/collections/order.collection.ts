import { CollectionConfig } from '../payload/collections/config/types';

export const OrderCollection: CollectionConfig = {
  slug: 'order',
  admin: {
    useAsTitle: 'account',
  },
  fields: [
    {
      name: 'account',
      label: 'Account',
      type: 'relationship',
      relationTo: 'account',
      required: true,
    },
    {
      name: 'product',
      label: 'Product',
      type: 'relationship',
      relationTo: 'product',
      required: true,
    },
    { name: 'product_total_price', label: 'Product Price', type: 'number', required: true },

    // Các trường về tính năng và phân loại sản phẩm
    {
      name: 'product_optionality',
      label: 'Product Optionality',
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
          ],
        },
        {
          name: 'optional_value',
          type: 'text',
          label: 'Optional Value',
          required: true,
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'quantity',
          label: 'Quantity',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
    },
    {
      name: 'total_price',
      label: 'Total Price',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'order_date',
      label: 'Order Date',
      type: 'date',
    },
  ],
};
