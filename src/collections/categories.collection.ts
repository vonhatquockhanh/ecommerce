import { CollectionConfig } from '../payload/collections/config/types';
import { MediaCollection } from './media.collection';

export const CategoriesCollection: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'category_name',
  },
  labels: { singular: 'Categories', plural: 'Categories' },
  fields: [
    { name: 'category_name', label: 'Category Name', type: 'text', required: true },
    { name: 'category_description', label: 'Category Description', type: 'textarea' },
    { name: 'category_image', label: 'Category Image', type: 'upload', relationTo: MediaCollection.slug },

    // Thêm trường parent_categories để chọn parent category cho mỗi category
    {
      name: 'parent_categories',
      label: 'Parent Categories',
      type: 'relationship',
      relationTo: 'categories', // Tham chiếu đến chính bảng categories
    },
  ],
  access: {
    read: ({ req: { user } }) => {

      // users who are authenticated will see all posts
      // if (user) {
      //   return true;
      // }

      // query publishDate to control when posts are visible to guests
      return {
        // and: [
        //   {
        //     publishDate: {
        //       less_than: new Date().toJSON(),
        //     },
        //     _status: {
        //       equals: 'published',
        //     },
        //   },
        // ],
      };
    },
  },
};
