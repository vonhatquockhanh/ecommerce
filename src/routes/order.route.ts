import { createOrderHandler, getOrderByUserServiceHandler } from '../handlers/order.handler';
import { uploadPaymentVoucherService } from '../services/order.service';

const express = require('express');
const router = express.Router();

router.post('/order', async function (_, res) {
  return await createOrderHandler(_, res);
});

router.get('/order/me', async function (_, res) {
  return await getOrderByUserServiceHandler(_, res);
});

router.post('/order/upload', async (_, res) => {
  const result = await uploadPaymentVoucherService(_);
  return res.json(result);
});

export default router;
