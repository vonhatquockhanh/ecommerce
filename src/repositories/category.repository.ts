import mongoose from 'mongoose';
import payload from '../payload';

export const getCategoryBySlug = async slug => {
  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } }, 
  });
  return categories;
};

// export const getAllCategoryAtLeastOneProduct = async (page = 1, limit = 10) => {
//   const categories = await payload.find({
//     collection: 'categories',
//     limit: 1000000,
//   });

//   if (categories && categories.docs.length) {
//     for (const category of categories.docs) {
//       const categoriesToCheck = [category.id];
//       const visitedCategories = new Set();
//       let productCount = 0;

//       while (categoriesToCheck.length > 0) {
//         const categoryIdToCheck = categoriesToCheck.shift();
//         if (!visitedCategories.has(categoryIdToCheck)) {
//           visitedCategories.add(categoryIdToCheck);

//           const childCategories = categories.docs.filter(
//             c => (c.parent_categories as any)?.id === categoryIdToCheck
//           );

//           categoriesToCheck.push(...childCategories.map(c => c.id));

//           const products = await payload.find({
//             collection: 'product',
//             where: { product_categories: { in: [categoryIdToCheck] } },
//             limit: 1000000,
//           });

//           productCount += products.docs.length;
//         }
//       }

//       category.productCount = productCount;
//     }

//     return categories;
//   }

//   return {
//     docs: [],
//   };
// };

export const getAllCategoryAtLeastOneProduct = async (page = 1, limit = 10) => {
  const categories = await payload.find({
    collection: 'categories',
    limit: 1000000,
  });

  if (categories && categories.docs.length) {
    for (const category of categories.docs) {
      const categoriesToCheck = [category.id];
      const visitedCategories = new Set();
      let productCount = 0;
      let stopLoop = false;

      while (categoriesToCheck.length > 0 && !stopLoop) {
        const categoryIdToCheck = categoriesToCheck.shift();
        if (!visitedCategories.has(categoryIdToCheck)) {
          visitedCategories.add(categoryIdToCheck);

          const childCategories = categories.docs.filter(
            c => (c.parent_categories as any)?.id === categoryIdToCheck
          );

          categoriesToCheck.push(...childCategories.map(c => c.id));

          const products = await payload.find({
            collection: 'product',
            where: { product_categories: { in: [categoryIdToCheck] } },
            limit: 1,
          });

          productCount += products.docs.length;

          if (productCount === 1) {
            stopLoop = true;
          }
        }
      }

      category.productCount = productCount;
    }

    return categories;
  }

  return {
    docs: [],
  };
};
