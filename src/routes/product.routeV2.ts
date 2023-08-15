import {
  getProductByCategorieIDV2Handler,
  getAllProductsHandler
} from '../handlers/product.handler';

const express = require('express');
const router = express.Router();

router.get('/products/categorieId/:categorieId', async function (_, res) {
  return await getProductByCategorieIDV2Handler(_, res);
});

router.get('/products/getAllProducts', async function (_, res) {
  return await getAllProductsHandler(_, res);
});

export default router;
