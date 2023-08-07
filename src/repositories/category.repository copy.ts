import payload from '../payload';

export const getCategoryBySlug = async slug => {
  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } }, 
  });
  return categories;
};
