import { CollectionConfig } from '../payload/collections/config/types';

export const AdminCollection: CollectionConfig = {
  slug: 'admin',
  auth: true,
  fields: [
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
      name: 'gender',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
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
      name: 'admin_code',
      label: 'Admin Code',
      type: 'text',
    },
  ],
};
