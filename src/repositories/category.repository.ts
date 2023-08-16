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
  const products = await payload.find({
    collection: 'product',
  });

  if (products && products.docs.length) {
    const productCategoryIds = products.docs.flatMap(product => product.product_categories);
    const uniqueCategoryIds = [...new Set(productCategoryIds)]; 

    const _idArray = uniqueCategoryIds.map(id => new mongoose.Types.ObjectId(id as string)); // Đặt kiểu dữ liệu là 'string'

    const categories = await payload.find({
      collection: 'categories',
      where: { _id: { in: _idArray } },
      page: page,
      limit: limit,
      sort: '-createdAt',
    });

    if (categories && categories.docs.length) {
      return categories;
    }

    return {
      docs: [],
    };
  }

  return {
    docs: [],
  };
};
