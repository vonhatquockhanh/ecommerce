import {
  getShipmentConfigHandler
} from '../handlers/shipment-config.handler';

const express = require('express');
const router = express.Router();

router.get('/calculate-shipment', async function (_, res) {
  return await getShipmentConfigHandler(_, res);
});

export default router;
