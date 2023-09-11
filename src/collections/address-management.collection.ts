import { CollectionConfig } from '../payload/collections/config/types';
import { ADDRESS_MANAGEMENT_TRANSLATION } from '../translate';

export const AddressManagementCollection: CollectionConfig = {
  slug: 'address_management',
  admin: {
    useAsTitle: 'recipient_name',
  },
  labels: { singular: ADDRESS_MANAGEMENT_TRANSLATION.address_management, plural: ADDRESS_MANAGEMENT_TRANSLATION.address_management },
  fields: [
    { name: 'recipient_name', label: ADDRESS_MANAGEMENT_TRANSLATION.recipient_name, type: 'text', required: true },
    { name: 'phone_number', label: ADDRESS_MANAGEMENT_TRANSLATION.phone_number, type: 'text', required: true },
    { name: 'cityId', label: ADDRESS_MANAGEMENT_TRANSLATION.city, type: 'text' },
    { name: 'districtId', label: ADDRESS_MANAGEMENT_TRANSLATION.district, type: 'text' },
    { name: 'wardId', label: ADDRESS_MANAGEMENT_TRANSLATION.ward, type: 'text' },
    { name: 'address', label: ADDRESS_MANAGEMENT_TRANSLATION.address, type: 'text' },
    {
      name: 'fullAddress',
      label: ADDRESS_MANAGEMENT_TRANSLATION.fullAddress,
      type: 'text',
    },
    {
      name: 'userId',
      label: 'userId',
      type: 'text',
      admin: {
        disabled: true,
      },
    },
  ],
  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
};
