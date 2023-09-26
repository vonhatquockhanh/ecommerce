import { isAdmin } from '../access/admins';
import { CollectionConfig } from '../payload/collections/config/types';
import { BILLING_TRANSLATION, ORDER_TRANSLATION, SHIPMENT_TRANSLATION } from '../translate';

export const ShipmentConfigCollection: CollectionConfig = {
  slug: 'shipment_config',
  admin: {
    useAsTitle: 'shipment_config',
  },
  labels: { singular: SHIPMENT_TRANSLATION.shipment, plural: SHIPMENT_TRANSLATION.shipment },
  fields: [
    { name: 'shipment_config_description', label: "shipment_config_description", type: 'text' },
    {
      name: 'set_shipping_price_based_on_volume',
      label: 'Set shipping price based on volume',
      type: 'array',
      minRows: 1,
      maxRows: 1,
      fields: [
        {
          name: 'min_quantity',
          label: 'Min (Gram)',
          type: 'number',
        },
        {
          name: 'max_quantity',
          label: 'Max (Gram)',
          type: 'number',
        },
        {
          name: 'price_shipment',
          label: 'Price shipment (VNĐ)',
          type: 'number',
        },
      ],
    },
    {
      name: 'set_the_price_to_increase_with_the_next_volume',
      label: 'Set the price to increase with the next volume',
      type: 'array',
      fields: [
        {
          name: 'volume_range_increases',
          label: 'Volume range increases (Gram)',
          type: 'number',
        },
        {
          name: 'price_increases',
          label: 'Price increases (VNĐ)',
          type: 'number',
        },
      ],
    }
  ],
  access: {
    read: isAdmin,
    create: isAdmin,
    update:  isAdmin,
    delete:  isAdmin,
  },
};
