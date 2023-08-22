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
