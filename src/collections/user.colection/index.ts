import { isAdmin } from '../../access/admins';
import { CollectionConfig } from '../../payload/collections/config/types';
import { USER_TRANSLATION } from '../../translate';
import { SupplierCollection } from '../supplier.collection';
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin';

export const UserCollection: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: { singular: USER_TRANSLATION.user, plural: USER_TRANSLATION.user },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: USER_TRANSLATION.user_name
    },
    {
      name: 'role',
      label: USER_TRANSLATION.user_role,
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
      label: USER_TRANSLATION.supplier,
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
