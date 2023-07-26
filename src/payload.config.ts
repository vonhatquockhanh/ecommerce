import { buildConfig } from './payload/config/build';
import { MediaCollection } from './collections/media.collection';
// import { UserCollection } from './collections/user.collection';
// import { AdminCollection } from './collections/admin.collection';
import { ProductCollection } from './collections/product.collection';
import { CategoriesCollection } from './collections/categories.collection';
import path from 'path'
import { AccountCollection } from './collections/account.collection';
import { OrderCollection } from './collections/order.collection';

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  serverURL: 'http://localhost:8000',
  collections: [
    ProductCollection,
    CategoriesCollection,
    MediaCollection,
    // UserCollection,
    // AdminCollection,
    AccountCollection,
    OrderCollection
  ],

  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
});
