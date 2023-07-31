import { buildConfig } from './payload/config/build';
import { MediaCollection } from './collections/media.collection';
// import { UserCollection } from './collections/user.collection';
// import { AdminCollection } from './collections/admin.collection';
import { ProductCollection } from './collections/product.collection';
import { CategoriesCollection } from './collections/categories.collection';
import path from 'path'
import { AccountCollection } from './collections/account.collection';
import { OrderCollection } from './collections/order.collection';
import { VariantCollection } from './collections/variant.collection';
import { ShipmentCollection } from './collections/shipment.collection';
import { BillingCollection } from './collections/billing.collection';

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

let cors = ['http://103.162.20.221:3000', 'http://localhost:8080', 'http://localhost:8000'];

export default buildConfig({
  serverURL: 'http://localhost:8000',
  cors: cors,
  collections: [
    VariantCollection,
    ProductCollection,
    CategoriesCollection,
    MediaCollection,
    // UserCollection,
    // AdminCollection,
    OrderCollection,
    ShipmentCollection,
    BillingCollection,
    AccountCollection,
  ],

  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
});
