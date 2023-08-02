import {
  getProductByCategorieIDHandler,
  getProductByTypeHandler,
  getProductBySectionIDHandler,
  getProductByProductNameHandler,
  getProductSectionV1Handler,
} from '../handlers/product.handler';

const express = require('express');
const router = express.Router();

router.get('/products/categorieId/:categorieId', async function (_, res) {
  return await getProductByCategorieIDHandler(_, res);
});

router.get('/products/productType/:productType', async function (_, res) {
  return await getProductByTypeHandler(_, res);
});

router.get('/products/sectionId/:sectionId', async function (_, res) {
  return await getProductBySectionIDHandler(_, res);
});

router.get('/product_sections', async function (_, res) {
  return await getProductSectionV1Handler(_, res);
});

router.get('/products', async function (_, res) {
  return await getProductByProductNameHandler(_, res);
});

export default router;
