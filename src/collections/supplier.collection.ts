import { isAdmin } from '../access/admins';
import { isSupplier } from '../access/supplier';
import { CollectionConfig } from '../payload/collections/config/types';
import { SUPPLIER_TRANSLATION } from '../translate';
import { MediaCollection } from './media.collection';

export const SupplierCollection: CollectionConfig = {
  slug: 'supplier',
  labels: { singular: SUPPLIER_TRANSLATION.supplier, plural: SUPPLIER_TRANSLATION.supplier },
  admin: {
    useAsTitle: 'supplier_name',
  },
  fields: [
    { name: 'supplier_name', label: SUPPLIER_TRANSLATION.supplier_name, type: 'text', required: true },
    {
      name: 'supplier_login',
      label: SUPPLIER_TRANSLATION.supplier_logo,
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'supplier_description', label: SUPPLIER_TRANSLATION.supplier_description, type: 'textarea', required: false },

    { name: 'supplier_bank_name', label: SUPPLIER_TRANSLATION.supplier_bank_name, type: 'text', required: false },
    { name: 'supplier_account_number', label: SUPPLIER_TRANSLATION.supplier_account_number, type: 'text', required: false },
    { name: 'supplier_account_holder_name', label: SUPPLIER_TRANSLATION.supplier_account_holder_name, type: 'text', required: false },
    { name: 'supplier_branch', label: SUPPLIER_TRANSLATION.supplier_branch, type: 'text', required: false },
    {
      name: 'supplier_qr_code',
      label: SUPPLIER_TRANSLATION.supplier_qr_code,
      type: 'upload',
      relationTo: 'media',
    },
  ],
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  // access: {
  //   read: () => true,
  //   create: () => true,
  //   update: () => true,
  //   delete: () => true,
  // },
};
