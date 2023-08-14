
import { CollectionConfig } from '../payload/collections/config/types';

export const ImportProductCollection: CollectionConfig = {
  slug: 'import_product',
  labels: { singular: 'Import Product', plural: 'Import Product' },
  admin: {
    useAsTitle: 'import_product_title',
    hideAPIURL: true,
  },
  fields: [],
  access: {
    read: () => true,
    create: () => true,
    update:  () => false,
    delete:  () => false,
    unlock:  () => false,
  },
  hooks: {
    afterChange: [({ doc, req, previousDoc, operation})=> {
      console.log('req.files.file:', req.files.file);
      console.log('doc:', doc);
    }],
    beforeValidate: [
      ({ data, req, operation, originalDoc }) => {
        if(!data.mimeType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
          throw new Error('Định dạng tệp không hợp lệ');
        }
      }
    ],
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  },
};
