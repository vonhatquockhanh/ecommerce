import { buildConfig } from './payload/config/build';
import { MediaCollection } from './collections/media.collection';
import { ProductCollection } from './collections/product.collection';
import { CategoriesCollection } from './collections/categories.collection';
import path from 'path'
import { UserCollection } from './collections/user.colection';
import { OrderCollection } from './collections/order.collection';
import { VariantCollection } from './collections/variant.collection';
import { ShipmentCollection } from './collections/shipment.collection';
import { BillingCollection } from './collections/billing.collection';
import { ProductSectionCollection } from './collections/product-section.collection';
import { SupplierCollection } from './collections/supplier.collection';
import dotenv from 'dotenv';

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')
const categoryService = path.resolve(__dirname, './services/category.service');
const productService = path.resolve(__dirname, './services/product.service');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

let cors = ['http://103.162.20.221:3000', 'http://localhost:8080'];

export default buildConfig({
  // serverURL: 'http://localhost:8000',
  // serverURL: 'https://admin.supply.aeyes.vn',
  serverURL: process.env.DOMAIN_URL,
  cors: cors,
  collections: [
    VariantCollection,
    ProductSectionCollection,
    ProductCollection,
    CategoriesCollection,
    MediaCollection,
    OrderCollection,
    ShipmentCollection,
    BillingCollection,
    SupplierCollection,
    UserCollection,
  ],
  admin: {
    webpack: config => {
      return {
        ...config,
        output: {
          ...config.output,
        },
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            [categoryService]: mockModulePath,
            [productService]: mockModulePath,
          },
        },
      };
    },
  },
  upload: {
    limits: {
      fileSize: 50000000, // 50MB, written in bytes
    },
  },
});
