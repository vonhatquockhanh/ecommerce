import mongoose from 'mongoose';
import payload from '../payload';

export const getCategoryBySlug = async slug => {
  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } }, 
  });
  return categories;
};

export const getAllCategoryAtLeastOneProduct = async (page = 1, limit = 10) => {
  const categories = await payload.find({
    collection: 'categories',
    limit: 1000000,
  });

  if (categories && categories.docs.length) {
    for (const category of categories.docs) {
      const products = await payload.find({
        where: { product_categories: { in: [category.id] } },
        collection: 'product',
        limit: 1000000,
      });

      category.productCount = products.docs.length;
    }

    return categories;
  }

  return {
    docs: [],
  };
};
