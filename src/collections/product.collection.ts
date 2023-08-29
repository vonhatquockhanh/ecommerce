import { CollectionConfig } from '../payload/collections/config/types';
import { MediaCollection } from './media.collection';
import { CategoriesCollection } from './categories.collection';
import EditorField from '../components/ckEditor';
import { VariantCollection } from './variant.collection';
import { ProductSectionCollection } from './product-section.collection';
import { isAdminOrCreatedBySupplierProduct } from '../access/supplier';
import { SupplierCollection } from './supplier.collection';
import { isAdmin } from '../access/admins';
import { PRODUCT_TRANSLATION, VARIANT_TRANSLATION } from '../translate';
import currencyField from '../components/CurrencyField/config';
import { generateProductSlug } from '../hooks/product/beforeChange';

export const ProductCollection: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'product_name',
  },
  labels: { singular: PRODUCT_TRANSLATION.product, plural: PRODUCT_TRANSLATION.product },
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.userId = req.user.id;
            if (req.user.role === 'supplier') {
              data.supplierId = req.user.supplier.id;
              return data;
            }
          }
        }
      },
      generateProductSlug,
    ],
    beforeValidate: [
      ({ data, req }) => {
        if (req.user.role !== 'supplier' && !data.supplierId) {
          throw new Error('Vui lòng chọn nhà cung cấp');
        }
      },
    ],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    // Đặt các trường bắt buộc (required) trước
    { name: 'product_name', label: PRODUCT_TRANSLATION.product_name, type: 'text', required: true },
    {
      name: 'product_images',
      label: PRODUCT_TRANSLATION.product_images,
      type: 'upload',
      relationTo: MediaCollection.slug,
      required: true,
    },
    currencyField,
    { name: 'product_weigh', label: PRODUCT_TRANSLATION.product_weigh, type: 'number', required: false },
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
      validate: (value, options) => {
        const { price_by_quantity } = options.siblingData;
        let inValidPriceRange = 0;
        if (Array.isArray(price_by_quantity) && price_by_quantity?.length > 0) {
          for (let i = 0; i < price_by_quantity.length; i++) {
            if (i === 0 && price_by_quantity[i].min_quantity < 0) {
              inValidPriceRange = 3;
              break;
            }
            if (price_by_quantity[i].max_quantity - (price_by_quantity[i].min_quantity + 1) < 0) {
              inValidPriceRange = 1;
              break;
            }
            if (price_by_quantity?.length > 1 && i < price_by_quantity?.length - 1) {
              if (price_by_quantity[i + 1].min_quantity - price_by_quantity[i].max_quantity < 1) {
                inValidPriceRange = 2;
                break;
              }
            }
          }
        }
        if (inValidPriceRange === 1 || inValidPriceRange === 2 || inValidPriceRange === 3) {
          return 'Vui lòng điều chỉnh lại khoảng số lượng tối thiếu và tối da';
        }
        return true;
      },
      admin: {
        description: 'Ex: [1-100] [101-200] [201-500]',
        condition: data => {
          if (data.product_is_same_price === true) {
            return true;
          } else {
            return false;
          }
        },
      },
      fields: [
        {
          name: 'min_quantity',
          label: 'Minimum Quantity',
          type: 'number',
          required: true,
          validate: (value, options) => {
            if (options.data.product_is_same_price === true && !value) {
              return options.t('error:pleaseEnterThisField');
            }
            return true;
          },
        },
        {
          name: 'max_quantity',
          label: 'Maximum Quantity',
          type: 'number',
          required: true,
          validate: (value, options) => {
            if (options.data.product_is_same_price === true && !value) {
              return options.t('error:pleaseEnterThisField');
            }
            return true;
          },
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          required: true,
          validate: (value, options) => {
            if (options.data.product_is_same_price === true && !value) {
              return options.t('error:pleaseEnterThisField');
            }
            return true;
          },
        },
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
      hasMany: true,
      access: {
        read: isAdmin
      },
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
        update: isAdmin,
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
