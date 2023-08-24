import {
  getProductByCategorieID,
  getProductByType,
  getProductBySectionID,
  getProductByProductName,
  getProductByCategorieIDV2,
  getProductSectionV1,
  getSuitableProductForUser,
  getProductByListCategorieID,
  getProductByID,
  getAllProducts,
  getSupplierByProductByID,
  generateSlug,
  getProductBySlug
} from '../repositories/product.repository';
import payload from '../payload';
const fs = require('fs');
const path = require('path');
import ExcelJS from 'exceljs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const getProductByCategorieIDService = async (categorieId, page = 1, limit = 10) => {
  const prod = await getProductByCategorieID(categorieId, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getProductByCategorieIDV2Service = async (categorieId, page = 1, limit = 10) => {
  const prod = await getProductByCategorieIDV2(categorieId, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getProductByTypeService = async (productType, page = 1, limit = 10) => {
  const prod = await getProductByType(productType, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getProductBySectionIDService = async (sectionId, page = 1, limit = 10) => {
  const prod = await getProductBySectionID(sectionId, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getProductByProductNameService = async (productName, page = 1, limit = 10) => {
  const prod = await getProductByProductName(productName, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getProductSectionV1Service = async (page = 1, limit = 10) => {
  const prod = await getProductSectionV1(page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getSuitableProductForUserService = async (productIds, page = 1, limit = 10) => {
  const prod = await getSuitableProductForUser(productIds, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getProductByListCategorieIDService = async (categorieIds, page = 1, limit = 10) => {
  const prod = await getProductByListCategorieID(categorieIds, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const getProductByIDService = async (productId) => {
  return await getProductByID(productId);
};

export const getAllProductsService = async (productName, page = 1, limit = 10) => {
  const prod = await getAllProducts(productName, page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};

export const ImportProductService = async (file) => {
  try {
    // Đường dẫn tương đối đến thư mục upload trong source
    const uploadFolderPath = path.join(__dirname, 'src/media');

    // Kiểm tra nếu thư mục không tồn tại, thì tạo thư mục mới
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath);
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.getWorksheet(1);

    const products = [];

    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
      if (rowNumber !== 1) {
        const product = {
          price_by_quantity: row.getCell(0)?.value ? JSON.parse(row.getCell(0).value.toString()) : [],
          product_categories: row.getCell(1)?.value ? JSON.parse(row.getCell(1).value.toString()) : [],
          product_description: row.getCell(2)?.value || '',
          product_images: row.getCell(3)?.value || '',
          product_is_same_price: row.getCell(4)?.value?.toString().toUpperCase() === 'TRUE',
          product_media: row.getCell(5)?.value ? JSON.parse(row.getCell(5).value.toString()) : [],
          product_name: row.getCell(6)?.value,
          product_rating: row.getCell(7)?.type === ExcelJS.ValueType.Number ? Number(row.getCell(7)?.value) : 0,
          product_sections: row.getCell(8)?.value ? JSON.parse(row.getCell(8).value.toString()) : [],
          product_total_price: row.getCell(9)?.type === ExcelJS.ValueType.Number ? Number(row.getCell(9)?.value) : 0,
          supplierId: row.getCell(10)?.value, // todo
          variant: row.getCell(11)?.value ? JSON.parse(row.getCell(11).value.toString()) : [],
          product_sale_price: row.getCell(12)?.type === ExcelJS.ValueType.Number ? Number(row.getCell(12)?.value) : 0,
          product_brand: row.getCell(13)?.value,
          product_tags: row.getCell(14)?.value,
        };

        // Loop và set id cho price_by_quantity
        product.price_by_quantity.forEach((item) => {
          if (!item.id) {
            item.id = uuidv4();
          }
        });

        // Loop và set id cho variant
        product.variant.forEach((item) => {
          if (!item.id) {
            item.id = uuidv4();
          }
        });

        // Loop và tải hình ảnh cho product_images và product_media
        for (let i = 0; i < product.product_media.length; i++) {
          const imageURL = product.product_media[i];
          const imageData = await axios.get(imageURL.toString(), { responseType: 'arraybuffer' });
          const fileName = uuidv4() + '.jpg';
          const filePath = path.join(uploadFolderPath, fileName);

          fs.writeFileSync(filePath, imageData.data);

          const mediaData = {
            file: fileName,
            mimeType: 'image/jpeg',
            sizes: {
              thumbnail: {
                width: 400,
                height: 300,
                mimeType: 'image/jpeg',
                filesize: imageData.data.length,
                filename: fileName,
              },
              card: {
                width: 768,
                height: 1024,
                mimeType: 'image/jpeg',
                filesize: imageData.data.length,
                filename: fileName,
              },
              tablet: {
                width: 1024,
                height: 1536,
                mimeType: 'image/jpeg',
                filesize: imageData.data.length,
                filename: fileName,
              },
            },
          };

          const mediaResponse = await payload.create({
            collection: 'media',
            data: mediaData,
          });

          product.product_media[i] = mediaResponse?.id;
        }

        products.push(product);
      }
    });

    if (products && products.length) {
      await Promise.all(products.map(async (item) => {
        // Cập nhật dữ liệu vào collection Product
        await payload.create({
          collection: 'product',
          data: item,
        });
      }));
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getSupplierByProductByIDService = async (productId) => {
  return await getSupplierByProductByID(productId);
};

export const generateSlugService = async (productName) => {
  return await generateSlug(productName);
};

export const getProductBySlugService = async (slug) => {
  const prod = await getProductBySlug(slug);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod.docs[0];
};