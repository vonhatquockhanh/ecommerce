import { CollectionConfig } from '../payload/collections/config/types';
import { OrderCollection } from './order.collection';

export const ShipmentCollection: CollectionConfig = {
  slug: 'shipment',
  admin: {
    useAsTitle: 'tracking_number',
  },
  fields: [
    {
      name: 'tracking_number',
      label: 'Tracking Number',
      type: 'text',
      required: true,
    },
    {
      name: 'billing',
      label: 'Billing',
      type: 'relationship',
      relationTo: 'billing',
      required: true,
    },
    {
      name: 'order',
      label: 'Order',
      type: 'relationship',
      relationTo: 'order',
      required: true,
    },
    // Bổ sung các trường vào array fields
    {
      name: 'shipment_details',
      label: 'Shipment Details',
      type: 'array',
      fields: [
        {
          name: 'shipment_date',
          label: 'Shipment Date',
          type: 'date',
          required: true,
        },
        {
          name: 'shipment_status',
          label: 'Shipment Status',
          type: 'select',
          options: [
            { value: 'pending', label: 'Pending' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'failed', label: 'Failed' },
          ],
          required: true,
          defaultValue: 'pending',
        },
        {
          name: 'shipment_notes',
          label: 'Shipment Notes',
          type: 'textarea',
        },
        {
          name: 'shipment_carrier',
          label: 'Carrier',
          type: 'text', // Sử dụng text để cho phép người dùng nhập thông tin về đơn vị vận chuyển
          required: true,
        },
        {
          name: 'shipment_current_step',
          label: 'Current Step',
          type: 'select', // Sử dụng checkbox để cho phép người dùng bấm ô chọn khâu hiện tại
          options: [
            { value: 'packing', label: 'Packing' },
            { value: 'in_transit', label: 'In Transit' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'failed', label: 'Failed' },
          ],
          required: true,
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update:  () => true,
    delete:  () => true,
  },
};
