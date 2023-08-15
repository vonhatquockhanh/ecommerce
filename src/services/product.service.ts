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
  getAllProducts
} from '../repositories/product.repository';

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