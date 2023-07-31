import { CollectionConfig } from '../payload/collections/config/types';

export const AccountCollection: CollectionConfig = {
  slug: 'account',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
    },
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
      name: 'date_of_birth',
      label: 'Date of birth',
      type: 'date',
    },
    {
      name: 'user_gender',
      label: 'Gender',
      type: 'select', 
      options: ['Male', 'Female', 'Other'],
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'national',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'organization_code',
      label: 'organization',
      type: 'text',
    },
    {
      name: 'username',
      type: 'text',
    },
    {
      name: 'role', 
      label: 'Role',
      type: 'select',
      options: ['admin', 'user'], 
      required: true, 
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update:  () => true,
    delete:  () => true,
  },
};
