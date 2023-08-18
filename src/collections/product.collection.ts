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
import { PRODUCT_TRANSLATION, VARIANT_TRANSLATION } from '../translate';

export const ProductCollection: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'product_name',
  },
  labels: { singular: PRODUCT_TRANSLATION.product, plural: PRODUCT_TRANSLATION.product },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user && req.user.role === 'supplier') {
            data.supplierId = req.user.supplier.id;
            return data;
          }
        }
      },
    ],
    beforeValidate: [
      ({ data, req, operation, originalDoc }) => {
        if (req.user.role !== 'supplier' && !data.supplierId) {
          throw new Error('Vui lòng chọn nhà cung cấp');
        }
      }
    ],
  },
  fields: [
    // Đặt các trường bắt buộc (required) trước
    { name: 'product_name',label: PRODUCT_TRANSLATION.product_name, type: 'text', required: true },
    // { name: 'product_short_description', label: PRODUCT_TRANSLATION.product_short_description, type: 'textarea', required: true },
    {
      name: 'product_images',
      label: PRODUCT_TRANSLATION.product_images,
      type: 'upload',
      relationTo: MediaCollection.slug,
      required: true,
    },

    { name: 'product_total_price', label: PRODUCT_TRANSLATION.product_price, type: 'number', required: true },
    { name: 'product_is_same_price', label: PRODUCT_TRANSLATION.is_same_price, type: 'checkbox', defaultValue: false },
    {
      name: 'variant',
      label: VARIANT_TRANSLATION.variant,
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'variant_item',
          label: VARIANT_TRANSLATION.variant_item,
          required: true,
          type: 'relationship',
          relationTo: VariantCollection.slug,
        },
        // { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
        { name: 'stock', label: 'Stock', type: 'number', required: false },
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
      label: PRODUCT_TRANSLATION.price_by_quantity,
      type: 'array',
      admin: {
        condition: (data) => {
            if (data.product_is_same_price === true) {
              return true;
            } else {
              return false;
            }

        }
      },
      fields: [
        { name: 'min_quantity', label: 'Minimum Quantity', type: 'number', required: true, validate: (value, options) => {
          if(options.data.product_is_same_price === true && !value) {
            return options.t('error:pleaseEnterThisField')
          }
          return true
        } },
        { name: 'max_quantity', label: 'Maximum Quantity', type: 'number', required: true, validate: (value, options) => {
          if(options.data.product_is_same_price === true && !value) {
            return options.t('error:pleaseEnterThisField')
          }
          return true
        } },
        { name: 'price', label: 'Price', type: 'number', required: true, validate: (value, options) => {
          if(options.data.product_is_same_price === true && !value) {
            return options.t('error:pleaseEnterThisField')
          }
          return true
        } },
      ],
    },
    {
      name: 'product_media',
      label: PRODUCT_TRANSLATION.product_images,
      type: 'relationship',
      relationTo: MediaCollection.slug,
      required: true,
      hasMany: true,
    },

    {
      name: 'product_categories',
      label: PRODUCT_TRANSLATION.product_category,
      type: 'relationship',
      relationTo: CategoriesCollection.slug,
      required: true,
      hasMany: true,
    },

    // Các trường về thương hiệu, đánh giá và các thuộc tính đặc biệt của sản phẩm
    { name: 'product_brand', label: PRODUCT_TRANSLATION.product_brand, type: 'text' },
    { name: 'product_rating', label: PRODUCT_TRANSLATION.product_rating, type: 'number', defaultValue: 0 },
    { name: 'product_tags', label: PRODUCT_TRANSLATION.product_tags, type: 'text' },

    // Các trường liên quan đến các tính năng khác của sản phẩm
    // { name: 'product_is_featured', label: 'Is Featured', type: 'checkbox', defaultValue: false },
    // { name: 'product_is_new', label: 'Is New', type: 'checkbox', defaultValue: false },
    // { name: 'product_is_sale', label: 'Is Sale', type: 'checkbox', defaultValue: false },

    {
      name: 'product_sections',
      label: PRODUCT_TRANSLATION.product_section,
      type: 'relationship',
      relationTo: ProductSectionCollection.slug,
      required: true,
      hasMany: true,
    },

    { name: 'product_sale_price', label: PRODUCT_TRANSLATION.product_sale_price, type: 'number' },
    { name: 'product_sale_percentage', label: PRODUCT_TRANSLATION.sale_percentage, type: 'number' },
    {
      name: 'product_description',
      label: 'Mô tả sản phẩm',
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
        create: isAdmin,
      },
      admin: {
        readOnly: false,
        position: 'sidebar',
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
