import { getCategoryBySlug } from '../repositories/category.repository';

export const getCategoryBySlugService = async catSlug => {
  const cat = await getCategoryBySlug(catSlug);
  if (cat.docs.length < 1) {
    return null;
  }
  return cat.docs[0];
}
