import { isAdmin } from '../../access/admins';
import { CollectionConfig } from '../../payload/collections/config/types';
import { SupplierCollection } from '../supplier.collection';
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin';

export const UserCollection: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'user_name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'supplier',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Supplier',
          value: 'supplier',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
    },
    {
      name: 'supplier',
      label: 'Supplier',
      type: 'relationship',
      relationTo: SupplierCollection.slug,
      required: false,
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
