import { ProductType } from '../const/product.enum';
import payload from '../payload';

export const getProductByCategorieID = async (categorieId, page = 1, limit = 10) => {
  const products = await payload.find({
    collection: 'product',
    where: { product_categories: { in: categorieId } }, 
    page: page,
    limit: limit,
    sort: "-createdAt"
  });
  
  return products;
};

export const getProductByType = async (productType, page = 1, limit = 10) => {
  let products;

  if (productType === ProductType.NEW) {
    products = await payload.find({
      collection: 'product',
      where: { product_is_new: { equals: true } },
      page: page,
      limit: limit,
      sort: "-createdAt"
    });
  } else if (productType === ProductType.FEATURED) {
    products = await payload.find({
      collection: 'product',
      where: { product_is_featured: { equals: true } },
      page: page,
      limit: limit,
      sort: "-createdAt"
    });
  } else if (productType === ProductType.SALE) {
    products = await payload.find({
      collection: 'product',
      where: { product_is_sale: { equals: true } },
      page: page,
      limit: limit,
      sort: "-createdAt"
    });
  }

  return products;
};
