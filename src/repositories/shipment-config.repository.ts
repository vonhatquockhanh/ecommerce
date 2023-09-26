import payload from '../payload';
// import axios from 'axios';

export const getShipmentByWeight = async weight => {
  try {
    // const profileUser: any = await axios.post(
    //   `${process.env.DOMAIN_AEYES_URL}/api/v1/auth/customer/me`,
    //   {},
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   },
    // );

    // if (!profileUser?.data) {
    //   throw new Error('not found');
    // }

    const shipmentConfig = await payload.find({
      collection: 'shipment_config',
      limit: 1,
      sort: '-createdAt',
    });

    if (shipmentConfig && shipmentConfig.docs && shipmentConfig.docs.length > 0) {
      const config = shipmentConfig.docs[0];
      const set_shipping_price_based_on_volume = config.set_shipping_price_based_on_volume as any[];
      const set_the_price_to_increase_with_the_next_volume =
        config.set_the_price_to_increase_with_the_next_volume as any[];

      let shippingFee = 0;
      let remainingWeight = weight;

      for (const priceRange of set_shipping_price_based_on_volume) {
        const { min_quantity, max_quantity, price_shipment } = priceRange;
        const rangeWeight = max_quantity - min_quantity;
        const quantityInRange = Math.min(rangeWeight, remainingWeight);
        shippingFee += Math.ceil(quantityInRange / max_quantity) * price_shipment;
        remainingWeight -= quantityInRange;

        if (remainingWeight <= 0) {
          break;
        }
      }

      for (const priceIncrease of set_the_price_to_increase_with_the_next_volume) {
        const { volume_range_increases, price_increases } = priceIncrease;
        const quantityInRange = Math.min(volume_range_increases, remainingWeight);
        shippingFee += Math.ceil(quantityInRange / volume_range_increases) * price_increases;
        remainingWeight -= quantityInRange;

        if (remainingWeight <= 0) {
          break;
        }
      }
      
      return { shippingFee: shippingFee ?? 0 };
    } else {
      return { shippingFee: 0 };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
