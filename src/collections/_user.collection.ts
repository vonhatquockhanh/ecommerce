import { CollectionConfig } from '../payload/collections/config/types';

export const UserCollection: CollectionConfig = {
  slug: 'user',
  admin: {
    useAsTitle: 'user_name',
  },
  fields: [
    {
      name: 'user_name',
      label: 'User Name',
      type: 'text',
      required: true, 
    },
    {
      name: 'user_first_name',
      label: 'First Name',
      type: 'text',
    },
    {
      name: 'user_last_name',
      label: 'Last Name',
      type: 'text',
    },
    {
      name: 'user_date_of_birth',
      label: 'Date of Birth',
      type: 'date',
    },
    {
      name: 'user_gender',
      label: 'Gender',
      type: 'select', // Sử dụng 'select' thay vì 'text' để người dùng có thể chọn giới tính từ một danh sách các tùy chọn.
      options: ['Male', 'Female', 'Other'],
    },
    {
      name: 'user_email',
      label: 'Email',
      type: 'email', // Sử dụng 'email' thay vì 'text' để kiểm tra tính hợp lệ của email.
      //required: true, // Thêm thuộc tính "required" để bắt buộc người dùng nhập email.
    },
    {
      name: 'user_phone',
      label: 'Phone Number',
      type: 'text', // Sử dụng 'tel' thay vì 'text' để kiểm tra tính hợp lệ của số điện thoại.
    },
    {
      name: 'user_identity_number',
      label: 'Identity Card Number',
      type: 'text',
    },
    {
      name: 'user_nationality',
      label: 'Nationality',
      type: 'text',
    },
    {
      name: 'user_country',
      label: 'Country',
      type: 'text',
    },
    {
      name: 'user_organization',
      label: 'Organization',
      type: 'text',
    },
    {
      name: 'user_shipping_address',
      label: 'Shipping Address',
      type: 'textarea', // Sử dụng 'textarea' thay vì 'text' để người dùng có thể nhập địa chỉ dài hơn.
    },
    {
      name: 'user_postal_code',
      label: 'Postal Code',
      type: 'text',
    },
    {
      name: 'user_is_verified',
      label: 'Verified',
      type: 'checkbox',
    },
  ],
};
