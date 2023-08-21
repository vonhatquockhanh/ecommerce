import {
  getProductByCategorieIDHandler,
  getProductByTypeHandler,
  getProductBySectionIDHandler,
  getProductByProductNameHandler,
  getProductSectionV1Handler,
  getSuitableProductForUserHandler,
  getProductByListCategorieIDHandler,
  getProductByIDHandler,
  getSupplierByProductByIDHandler
} from '../handlers/product.handler';

const express = require('express');
const router = express.Router();

router.get('/products/categorieId/:categorieId', async function (_, res) {
  return await getProductByCategorieIDHandler(_, res);
});

router.get('/products/getProductByListCategorieID', async function (_, res) {
  return await getProductByListCategorieIDHandler(_, res);
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

router.get('/products/suitableProductForUser', async function (_, res) {
  return await getSuitableProductForUserHandler(_, res);
});

router.get('/products/:productId', async function (_, res) {
  return await getProductByIDHandler(_, res);
});

router.get('/products/getSupplierByProductByID/:productId', async function (_, res) {
  return await getSupplierByProductByIDHandler(_, res);
});

export default router;
