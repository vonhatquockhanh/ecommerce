import { isAdmin } from '../access/admins';
import { CollectionConfig } from '../payload/collections/config/types';

export const SupplierCollection: CollectionConfig = {
  slug: 'supplier',
  labels: { singular: 'Supplier', plural: 'Supplier' },
  admin: {
    useAsTitle: 'supplier_name',
  },
  fields: [
    { name: 'supplier_name', label: 'Supplier name', type: 'text', required: true },
    { name: 'supplier_description', label: 'Supplier Description', type: 'textarea', required: false },
  ],
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
};
