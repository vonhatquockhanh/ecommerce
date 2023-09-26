import {
  getShipmentByWeight
} from '../repositories/shipment-config.repository';

export const getShipmentConfigService = async (weight) => {
  return await getShipmentByWeight(weight);
};
