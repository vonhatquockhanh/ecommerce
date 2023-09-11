import { isAdmin } from '../access/admins';
import { CollectionConfig } from '../payload/collections/config/types';
import { BILLING_TRANSLATION, ORDER_TRANSLATION, SHIPMENT_TRANSLATION } from '../translate';
import { OrderCollection } from './order.collection';

export const ShipmentCollection: CollectionConfig = {
  slug: 'shipment',
  admin: {
    useAsTitle: 'tracking_number',
  },
  labels: { singular: SHIPMENT_TRANSLATION.shipment, plural: SHIPMENT_TRANSLATION.shipment },
  fields: [
    {
      name: 'tracking_number',
      label: SHIPMENT_TRANSLATION.tracking_number,
      type: 'text',
      required: true,
    },
    {
      name: 'billing',
      label: BILLING_TRANSLATION.billing,
      type: 'relationship',
      relationTo: 'billing',
      required: true,
    },
    {
      name: 'order',
      label: ORDER_TRANSLATION.order,
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
          label: SHIPMENT_TRANSLATION.shipment_date,
          type: 'date',
          required: true,
        },
        {
          name: 'shipment_status',
          label: SHIPMENT_TRANSLATION.shipment_status,
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
          label: SHIPMENT_TRANSLATION.shipment_notes,
          type: 'textarea',
        },
        {
          name: 'shipment_carrier',
          label: SHIPMENT_TRANSLATION.carrier,
          type: 'text', // Sử dụng text để cho phép người dùng nhập thông tin về đơn vị vận chuyển
          required: true,
        },
        {
          name: 'shipment_current_step',
          label: SHIPMENT_TRANSLATION.current_step,
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
    read: () => false,
    create: isAdmin,
    update:  isAdmin,
    delete:  isAdmin,
  },
};
