import { CollectionConfig } from '../payload/collections/config/types';

export const BillingCollection: CollectionConfig = {
  slug: 'billing',
  admin: {
    useAsTitle: 'billing_id',
  },
  labels: { singular: 'Billing', plural: 'Billings' },
  fields: [
    { name: 'billing_id', label: 'Billing ID', type: 'text', required: true },
    { name: 'amount_due', label: 'Amount Due', type: 'number', required: true },
    { name: 'amount_paid', label: 'Amount Paid', type: 'number', required: true },
    {
      name: 'payment_method',
      label: 'Payment Method',
      type: 'select', // Sử dụng select để chọn trong danh sách các tùy chọn
      required: true,
      options: [
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'paypal', label: 'PayPal' },
        { value: 'bank_transfer', label: 'Bank Transfer' },
        // Thêm các tùy chọn khác tùy theo yêu cầu của bạn
      ],
    },
    { name: 'payment_date', label: 'Payment Date', type: 'date', required: true },
    {
      name: 'status',
      label: 'Status',
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
};