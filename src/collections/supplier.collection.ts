import { isAdmin } from '../access/admins';
import { isSupplier } from '../access/supplier';
import { CollectionConfig } from '../payload/collections/config/types';
import { MediaCollection } from './media.collection';

export const SupplierCollection: CollectionConfig = {
  slug: 'supplier',
  labels: { singular: 'Supplier', plural: 'Supplier' },
  admin: {
    useAsTitle: 'supplier_name',
  },
  fields: [
    { name: 'supplier_name', label: 'Supplier name', type: 'text', required: true },
    {
      name: 'supplier_login',
      label: 'Supplier Logo',
      type: 'upload',
      relationTo: MediaCollection.slug,
    },
    { name: 'supplier_description', label: 'Supplier Description', type: 'textarea', required: false },
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
