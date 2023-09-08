import {
  createAddressManagementHandler,
  updateAddressManagementHandler,
  getAllAddressManagementHandler,
} from '../handlers/address_management.handler';

const express = require('express');
const router = express.Router();

router.post('/address-management', async function (_, res) {
  return await createAddressManagementHandler(_, res);
});

router.put('/address-management/:id', async function (_, res) {
  return await updateAddressManagementHandler(_, res);
});

router.get('/address-management', async function (_, res) {
  return await getAllAddressManagementHandler(_, res);
});

export default router;
