import { getCategoryBySlug, getAllCategoryAtLeastOneProduct } from '../repositories/category.repository';

export const getCategoryBySlugService = async catSlug => {
  const cat = await getCategoryBySlug(catSlug);
  if (cat.docs.length < 1) {
    return null;
  }
  return cat.docs[0];
};

export const getAllCategoryAtLeastOneProductService = async (page = 1, limit = 10) => {
  const prod = await getAllCategoryAtLeastOneProduct(page, limit);
  if (prod.docs.length < 1) {
    return null;
  }
  return prod;
};
