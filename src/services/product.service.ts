import { getProductByCategorieID, getProductByType, getProductBySectionID, getProductByProductName } from '../repositories/product.repository';

export const getProductByCategorieIDService = async (categorieId, page = 1, limit = 10) => {
  const prod = await getProductByCategorieID(categorieId, page, limit);
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

