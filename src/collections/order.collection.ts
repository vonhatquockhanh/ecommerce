// import { populate } from '../hooks/generateFullName.hook';
import { isAdmin, isAdminOrCreatedBy } from '../access/admins';
import { isAdminOrCreatedBySupplier } from '../access/supplier';
import { CollectionConfig, TypeWithID } from '../payload/collections/config/types';
import { FieldHook } from '../payload/fields/config/types';
import { ORDER_TRANSLATION, PRODUCT_TRANSLATION, SHIPMENT_TRANSLATION } from '../translate';
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
  labels: { singular: ORDER_TRANSLATION.order, plural: ORDER_TRANSLATION.order },
  admin: {
    useAsTitle: 'tracking_number',
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user && req.user.role === 'supplier') {
            data.supplierId = req.user.supplier.id;
            return data;
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'order_id',
      label: "OID",
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'tracking_number',
      label: SHIPMENT_TRANSLATION.tracking_number,
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
    {
      name: 'first_name',
      label: ORDER_TRANSLATION.first_name,
      type: 'text',
    },
    {
      name: 'last_name',
      label: ORDER_TRANSLATION.last_name,
      type: 'text',
    },
    {
      name: 'email',
      label: 'email',
      type: 'text',
      unique: false,
    },
    {
      name: 'phone',
      label: ORDER_TRANSLATION.phone,
      type: 'text',
    },
    {
      name: 'product',
      label: PRODUCT_TRANSLATION.product,
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
      label: ORDER_TRANSLATION.total_price,
      type: 'number',
      admin: {
        readOnly: true,
      },
    },

    { 
      name: 'payment_status', 
      label: ORDER_TRANSLATION.payment_status, 
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
      // required: true,
      access: {
        update: isAdmin,
        read: isAdmin,
        create: isAdmin,
      },
      admin: {
        readOnly: false,
        position: 'sidebar',
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