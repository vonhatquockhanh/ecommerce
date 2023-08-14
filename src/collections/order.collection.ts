// import { populate } from '../hooks/generateFullName.hook';
import { isAdmin, isAdminOrCreatedBy } from '../access/admins';
import { isAdminOrCreatedBySupplier } from '../access/supplier';
import { CollectionConfig, TypeWithID } from '../payload/collections/config/types';
import { FieldHook } from '../payload/fields/config/types';
import { SupplierCollection } from './supplier.collection';
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
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.supplierId = req.user.supplier.id;
            return data;
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'tracking_number',
      label: 'Tracking Number',
      type: 'text',
      required: true,
    },
    {
      name: 'userId',
      label: 'userId',
      type: 'text',
      admin: {
        disabled: true
      }
    },
    // {
    //   name: 'account',
    //   label: 'Account',
    //   type: 'relationship',
    //   relationTo: 'account',
    //   required: true,
    // },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'email',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'phone',
      type: 'text',
    },
    {
      name: 'product',
      label: 'Product',
      type: 'relationship',
      relationTo: 'product',
      required: true,
    },
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
      name: 'total_price',
      label: 'Total Price',
      type: 'number',
      admin: {
        readOnly: true,
      },
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
      defaultValue: new Date().toISOString(),
      admin: {
        hidden: true,
      }
    },
    {
      name: 'supplierId',
      type: 'relationship',
      relationTo: SupplierCollection.slug,
      access: {
        update: () => false,
        read: isAdmin
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: data => Boolean(data?.supplierId),
      },
    },
  ],
  // access: {
  //   read: isAdminOrCreatedBySupplier,
  //   update: isAdminOrCreatedBySupplier,
  //   delete: isAdminOrCreatedBySupplier,
  // },
  access: {
    read: isAdminOrCreatedBySupplier,
    create: isAdminOrCreatedBySupplier,
    update: isAdminOrCreatedBySupplier,
    delete: isAdminOrCreatedBySupplier,
  },
};