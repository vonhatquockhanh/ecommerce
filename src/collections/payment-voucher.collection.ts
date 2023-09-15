import { isAdmin } from '../access/admins';
import { isAdminOrCreatedBySupplierMedia } from '../access/supplier';
import { CollectionConfig } from '../payload/collections/config/types';
import { PAYMENT_VOUCHER_TRANSLATION } from '../translate';
import { SupplierCollection } from './supplier.collection';

export const PaymentVoucherCollection: CollectionConfig = {
  slug: 'payment_voucher',
  labels: { singular: PAYMENT_VOUCHER_TRANSLATION.title, plural: PAYMENT_VOUCHER_TRANSLATION.title },
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
  upload: {
    staticURL: '/voucher',
    staticDir: 'voucher',
    imageSizes: [],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', label: 'Alt Text', type: 'text' },
    {
      name: 'supplierId',
      type: 'relationship',
      relationTo: SupplierCollection.slug,
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
  access: {
    read: isAdminOrCreatedBySupplierMedia,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
};
