import { getCategoryBySlugHandler } from '../handlers/category.handler';

const express = require('express');
const router = express.Router();

router.get('/categories/slug/:slug', async function (_, res) {
  return await getCategoryBySlugHandler(_, res);
});

export default router;
