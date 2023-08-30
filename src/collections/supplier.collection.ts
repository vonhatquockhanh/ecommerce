import { isAdmin } from '../access/admins';
import { VietqrField } from '../components/VietqrField/field';
import { CollectionConfig } from '../payload/collections/config/types';
import { SUPPLIER_TRANSLATION } from '../translate';

export const SupplierCollection: CollectionConfig = {
  slug: 'supplier',
  labels: { singular: SUPPLIER_TRANSLATION.supplier, plural: SUPPLIER_TRANSLATION.supplier },
  admin: {
    useAsTitle: 'supplier_name',
  },
  fields: [
    { name: 'supplier_name', label: SUPPLIER_TRANSLATION.supplier_name, type: 'text', required: true },
    VietqrField,
    { name: 'bank_name', label: 'Ngân hàng', type: 'text', hidden: true },
    { name: 'bank_short_name', label: 'Tên ngân hàng viết tắt', type: 'text', hidden: true },
    { name: 'bank_bin', label: 'Bank BIN', type: 'text', hidden: true },
    {
      name: 'supplier_logo',
      label: SUPPLIER_TRANSLATION.supplier_logo,
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'supplier_description', label: SUPPLIER_TRANSLATION.supplier_description, type: 'textarea', required: false },

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
