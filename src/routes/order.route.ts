import { createOrderHandler, getOrderByUserServiceHandler } from '../handlers/order.handler';

const express = require('express');
const router = express.Router();

router.post('/order', async function (_, res) {
  return await createOrderHandler(_, res);
});

router.get('/order/me', async function (_, res) {
  return await getOrderByUserServiceHandler(_, res);
});

export default router;
