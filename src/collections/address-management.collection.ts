import { CollectionConfig } from '../payload/collections/config/types';

export const AddressManagementCollection: CollectionConfig = {
  slug: 'address_management',
  admin: {
    useAsTitle: 'recipient_name',
  },
  labels: { singular: 'Quản lý địa chỉ', plural: 'Quản lý địa chỉ' },
  fields: [
    { name: 'recipient_name', label: 'Tên người nhận', type: 'text', required: true },
    { name: 'phone_number', label: 'SĐT liên lạc', type: 'text', required: true },
    { name: 'cityId', label: 'Tỉnh/Thành phố', type: 'text' },
    { name: 'districtId', label: 'Quận/Huyện', type: 'text' },
    { name: 'wardId', label: 'Phường/Xã', type: 'text' },
    { name: 'address', label: 'Địa chỉ', type: 'text' },
    {
      name: 'fullAddress',
      label: 'Địa chỉ đầy đủ',
      type: 'text',
      admin: {
        disabled: true,
      },
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
    create: () => true,
    update: () => true,
    delete: () => true,
  },
};

