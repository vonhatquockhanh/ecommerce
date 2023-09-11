import { isAdmin } from '../access/admins';
import { CollectionConfig } from '../payload/collections/config/types';
import { BILLING_TRANSLATION } from '../translate';

export const BillingCollection: CollectionConfig = {
  slug: 'billing',
  admin: {
    useAsTitle: 'billing_id',
  },
  labels: { singular: BILLING_TRANSLATION.billing, plural: BILLING_TRANSLATION.billing },
  fields: [
    { name: 'billing_id', label: BILLING_TRANSLATION.billing_id, type: 'text', required: true },
    { name: 'amount_due', label: BILLING_TRANSLATION.amount_due, type: 'number', required: true },
    { name: 'amount_paid', label: BILLING_TRANSLATION.amount_paid, type: 'number', required: true },
    {
      name: 'payment_method',
      label: BILLING_TRANSLATION.payment_method,
      type: 'select', // Sử dụng select để chọn trong danh sách các tùy chọn
      required: true,
      options: [
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'paypal', label: 'PayPal' },
        { value: 'bank_transfer', label: 'Bank Transfer' },
        // Thêm các tùy chọn khác tùy theo yêu cầu của bạn
      ],
    },
    { name: 'payment_date', label: BILLING_TRANSLATION.payment_date, type: 'date', required: true },
    {
      name: 'status',
      label: BILLING_TRANSLATION.status,
      type: 'select', // Sử dụng select để chọn trong danh sách các tùy chọn
      required: true,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'paid', label: 'Paid' },
        { value: 'failed', label: 'Failed' },
        { value: 'cancelled', label: 'Cancelled' },
        // Thêm các tùy chọn khác tùy theo yêu cầu của bạn
      ],
    }

  ],
  access: {
    read: () => false,
    create: isAdmin,
    update:  isAdmin,
    delete:  isAdmin,
  },
};