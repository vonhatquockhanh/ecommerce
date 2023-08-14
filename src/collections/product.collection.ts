import { CollectionConfig } from '../payload/collections/config/types';
import { MediaCollection } from './media.collection';
import { CategoriesCollection } from './categories.collection';
import EditorField from '../components/ckEditor';
import { VariantCollection } from './variant.collection';
import { ProductSectionCollection } from './product-section.collection';
import { isAdminOrCreatedBySupplier, isAdminOrCreatedBySupplierProduct } from '../access/supplier';
import { UserCollection } from './user.colection';
import { SupplierCollection } from './supplier.collection';
import { isAdmin } from '../access/admins';

export const ProductCollection: CollectionConfig = {
  slug: 'product',
  auth: false,
  admin: {
    useAsTitle: 'product_name',
  },

  labels: { singular: 'Product', plural: 'Product' },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.supplierId = req.user.supplier.id;
            return data;
          }
        }
      },
    ],
  },
  fields: [
    // Đặt các trường bắt buộc (required) trước
    { name: 'product_name', label: 'Product Name', type: 'text', required: true },
    { name: 'product_short_description', label: 'Product Short Description', type: 'textarea', required: true },
    {
      name: 'product_images',
      label: 'Product Images',
      type: 'upload',
      relationTo: MediaCollection.slug,
      required: true,
    },

    { name: 'product_total_price', label: 'Product Price', type: 'number', required: true },
    { name: 'product_is_same_price', label: 'Is Same price', type: 'checkbox', defaultValue: true },

    // Các trường về tính năng và phân loại sản phẩm
    // {
    //   name: 'product_optionality',
    //   label: 'Product Optionality',
    //   type: 'array',
    //   fields: [
    //     {
    //       name: 'optional_type',
    //       label: 'Optional Type',
    //       type: 'select',
    //       required: true,
    //       options: [
    //         { value: 'color', label: 'Color' },
    //         { value: 'size', label: 'Size' },
    //       ],
    //     },
    //     {
    //       name: 'optional_value',
    //       type: 'text',
    //       label: 'Optional Value',
    //       required: true,
    //     },
    //     { name: 'price', label: 'Price', type: 'number' },
    //   ],
    // },

    {
      name: 'variant',
      label: 'Variant',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'variant_item',
          label: 'Variant item',
          required: true,
          type: 'relationship',
          relationTo: VariantCollection.slug,
        },
        // { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
      ],
    },

    // {
    //   name: 'variants',
    //   label: 'Variants',
    //   type: 'array', // Sử dụng kiểu dữ liệu "array" cho việc chọn nhiều biến thể
    //   of: [{ type: 'relationship', relationTo: 'variant', required: true }],
    //   required: true,
    // },

    {
      name: 'price_by_quantity',
      label: 'Price By Quantity',
      type: 'array',
      fields: [
        { name: 'min_quantity', label: 'Minimum Quantity', type: 'number', required: true },
        { name: 'max_quantity', label: 'Maximum Quantity', type: 'number', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
      ],
    },

    {
      name: 'product_media',
      label: 'Product Media',
      type: 'relationship',
      relationTo: MediaCollection.slug,
      required: true,
      hasMany: true,
    },

    {
      name: 'product_categories',
      label: 'Product Categories',
      type: 'relationship',
      relationTo: CategoriesCollection.slug,
      required: true,
      hasMany: true,
    },

    // Các trường về thương hiệu, đánh giá và các thuộc tính đặc biệt của sản phẩm
    { name: 'product_brand', label: 'Product Brand', type: 'text' },
    { name: 'product_rating', label: 'Product Rating', type: 'number', defaultValue: 0 },
    { name: 'product_tags', label: 'Product Tags', type: 'text' },

    // Các trường liên quan đến các tính năng khác của sản phẩm
    // { name: 'product_is_featured', label: 'Is Featured', type: 'checkbox', defaultValue: false },
    // { name: 'product_is_new', label: 'Is New', type: 'checkbox', defaultValue: false },
    // { name: 'product_is_sale', label: 'Is Sale', type: 'checkbox', defaultValue: false },

    {
      name: 'product_sections',
      label: 'Product Section',
      type: 'relationship',
      relationTo: ProductSectionCollection.slug,
      required: true,
      hasMany: true,
    },

    { name: 'product_sale_price', label: 'Sale Price', type: 'number' },
    { name: 'product_sale_percentage', label: 'Sale Percentage', type: 'number' },
    {
      name: 'product_description',
      label: 'Product Description',
      type: 'text',
      admin: { components: { Field: EditorField } },
    },
    {
      name: 'supplierId',
      type: 'relationship',
      relationTo: SupplierCollection.slug,
      access: {
        update: () => false,
        read: isAdmin,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: data => Boolean(data?.supplierId),
      },
    },
  ],
  access: {
    read: isAdminOrCreatedBySupplierProduct,
    create: isAdminOrCreatedBySupplierProduct,
    update: isAdminOrCreatedBySupplierProduct,
    delete: isAdminOrCreatedBySupplierProduct,
  },
};
