import {
  getShipmentConfigService
} from '../services/shipment-config.service';

export const getShipmentConfigHandler = async (req, res) => {
  try {
    // const headers = req.headers;

    // if (headers && headers.authorization) {
    //   const token = headers.authorization.split(' ')[1];

    //   const addressManagement = await getShipmentConfigService(token);

    //   if (!addressManagement) {
    //     const body = { errors: [{ message: 'Not Found' }] };
    //     return res.status(404).json(body).end();
    //   }

    //   return res.status(200).json(addressManagement).end();
    // } else {
    //   const body = { errors: [{ message: 'Token not found in headers' }] };
    //   return res.status(404).json(body).end();
    // }
    const shipmentConfigInfo = await getShipmentConfigService(req.query.weight);

    if (!shipmentConfigInfo) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(shipmentConfigInfo).end();

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};
