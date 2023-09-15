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
import { AddressManagementCollection } from './collections/address-management.collection';
import { PaymentVoucherCollection } from './collections/payment-voucher.collection';
import dotenv from 'dotenv';
import { CounterCollection } from './collections/counter.collection';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { buildAdapter } from './utilities/s3Helper';

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')
const categoryService = path.resolve(__dirname, './services/category.service');
const productService = path.resolve(__dirname, './services/product.service');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

let cors = ['http://103.162.20.221:3000', 'http://localhost:8080'];

export default buildConfig({
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
    PaymentVoucherCollection,
    AddressManagementCollection,
    UserCollection,
    CounterCollection,
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
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: buildAdapter(),
          // prefix: 'assets',  
          disableLocalStorage: true,
        },
        payment_voucher: {
          adapter: buildAdapter(),
          // prefix: 'assets',  
          disableLocalStorage: true,
        },
      },
    })
  ]
});
