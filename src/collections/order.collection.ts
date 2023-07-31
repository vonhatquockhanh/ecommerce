// import { populate } from '../hooks/generateFullName.hook';
import { CollectionConfig, TypeWithID } from '../payload/collections/config/types';
import { FieldHook } from '../payload/fields/config/types';
import { VariantCollection } from './variant.collection';

// const calculateTotal: FieldHook = async ({ data }) => {
//   const quantity = data.quantity || 0;
//   const total_price = data.total_price || 0;

//   console.log("********************************");

//   // Tính toán giá trị mới cho trường "total"
//   const total = quantity * total_price;

//   // Trả về giá trị mới để set cho trường "total"
//   return total;
// };

export const OrderCollection: CollectionConfig = {
  slug: 'order',
  admin: {
    useAsTitle: 'tracking_number',
  },
  fields: [
    {
      name: 'tracking_number',
      label: 'Tracking Number',
      type: 'text',
      required: true,
    },
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

    // {
    //   name: 'quantity',
    //   label: 'Quantity',
    //   type: 'number',
    //   required: true,
    // },
    // {
    //   name: 'total_price',
    //   label: 'Total Price',
    //   type: 'number',
    //   // admin: {
    //   //   readOnly: true,
    //   // },
    // },

    // {
    //   name: 'total',
    //   type: 'number',
    //   hooks: {
    //     beforeChange: [calculateTotal]
    //   },
    // },

    {
      name: 'variant',
      label: 'Variant',
      type: 'array',
      fields: [
        {
          name: 'variant_item',
          label: 'Variant item',
          required: true,
          type: 'relationship',
          relationTo: VariantCollection.slug,
        },
        { name: 'quantity_buy', label: 'Quantity Buy', type: 'number', required: true },
        { name: 'total_price', label: 'Total Price', type: 'number', required: true },
      ],
    },
    { 
      name: 'payment_status', 
      label: 'Payment Status', 
      type: 'checkbox', 
      defaultValue: false 
    },    
    {
      name: 'order_date',
      label: 'Order Date',
      type: 'date',
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update:  () => true,
    delete:  () => true,
  },
};