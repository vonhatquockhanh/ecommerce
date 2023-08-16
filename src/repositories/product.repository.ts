import mongoose from 'mongoose';
import { ProductType } from '../const/product.enum';
import payload from '../payload';

export const getProductByCategorieID = async (categorieId, page = 1, limit = 10) => {
  const products = await payload.find({
    collection: 'product',
    where: { product_categories: { in: categorieId } },
    page: page,
    limit: limit,
    sort: '-createdAt',
  });

  return products;
};

// export const getProductByCategorieIDV2 = async (categorieId, page = 1, limit = 10) => {
//   let categoriesIds = [];
//   categoriesIds.push(categorieId);

//   const categories = await payload.find({
//     collection: 'categories',
//     limit: 1000000,
//   });

//   if (categories && categories?.docs?.length) {
//     categories.docs.forEach(category => {
//       if ((category?.parent_categories as any)?.id === categorieId) {
//         categoriesIds.push(category.id);
//       }
//     });

//     const products = await payload.find({
//       collection: 'product',
//       where: { product_categories: { in: categoriesIds } },
//       page: page,
//       limit: limit,
//       sort: '-createdAt',
//     });

//     return products;
//   }

//   return null;
// };

export const getProductByCategorieIDV2 = async (categorieId, page = 1, limit = 10) => {
  let categoriesIds = [categorieId];

  const categories = await payload.find({
    collection: 'categories',
    limit: 1000000,
  });

  if (categories && categories.docs.length) {
    let categoriesToCheck = [...categoriesIds]; 

    while (categoriesToCheck.length > 0) {
      const categoryIdToCheck = categoriesToCheck.shift(); 
      categories.docs.forEach(category => {
        if ((category?.parent_categories as any)?.id === categoryIdToCheck) {
          categoriesIds.push(category.id);
          categoriesToCheck.push(category.id); 
        }
      });
    }

    const products = await payload.find({
      collection: 'product',
      where: { product_categories: { in: categoriesIds } },
      page: page,
      limit: limit,
      sort: '-createdAt',
    });

    return products;
  }

  return null;
};

export const getProductByListCategorieID = async (categorieIds, page = 1, limit = 10) => {
  if (!categorieIds || categorieIds.trim() === '' || categorieIds.trim() === '[]') {
    return {
      docs: [],
    };
  }

  const temp = categorieIds
    .slice(1, -1)
    .split(',')
    .map(id => id.trim());

  // list categories ids
  const _idArray = temp.map(id => new mongoose.Types.ObjectId(id));

  if (_idArray && _idArray.length) {
    const categories = await payload.find({
      collection: 'categories',
      where: {
        or: [{ parent_categories: { in: _idArray } }, { _id: { in: _idArray } }],
      },
    });

    if (categories && categories?.docs?.length) {
      const products = await payload.find({
        collection: 'product',
        where: { product_categories: { in: categories.docs.map(x => x.id) } },
        page: page,
        limit: limit,
        sort: '-createdAt',
      });

      return products;
    }

    return {
      docs: [],
    };
  }

  return {
    docs: [],
  };
};

export const getProductByType = async (productType, page = 1, limit = 10) => {
  let products;

  if (productType === ProductType.NEW) {
    products = await payload.find({
      collection: 'product',
      where: { product_is_new: { equals: true } },
      page: page,
      limit: limit,
      sort: '-createdAt',
    });
  } else if (productType === ProductType.FEATURED) {
    products = await payload.find({
      collection: 'product',
      where: { product_is_featured: { equals: true } },
      page: page,
      limit: limit,
      sort: '-createdAt',
    });
  } else if (productType === ProductType.SALE) {
    products = await payload.find({
      collection: 'product',
      where: { product_is_sale: { equals: true } },
      page: page,
      limit: limit,
      sort: '-createdAt',
    });
  }

  return products;
};

export const getProductBySectionID = async (sectionId, page = 1, limit = 10) => {
  const products = await payload.find({
    collection: 'product',
    where: { product_sections: { in: sectionId } },
    page: page,
    limit: limit,
    sort: '-createdAt',
  });

  return products;
};

export const getProductSectionV1 = async (page = 1, limit = 10) => {
  const productSections = await payload.find({
    collection: 'product_sections',
    page: page,
    limit: limit,
    sort: '-createdAt',
  });

  if (productSections && productSections?.docs?.length) {
    // loop through
    for (let i = 0; i < productSections?.docs?.length; i++) {
      let itemProductSections = productSections?.docs[i];

      const productInfo = await payload.find({
        collection: 'product',
        where: { product_sections: { equals: itemProductSections?.id } },
      });

      itemProductSections.totalProducts = productInfo?.docs?.length ?? 0;
    }
  }

  return productSections;
};

export const getProductByProductName = async (productName, page = 1, limit = 10) => {
  const products = await payload.find({
    collection: 'product',
    where: { product_name: { like: productName } },
    page: page,
    limit: limit,
    sort: '-createdAt',
  });

  return products;
};

export const getSuitableProductForUser = async (productIds, page = 1, limit = 10) => {
  if (!productIds || productIds.trim() === '' || productIds.trim() === '[]') {
    return {
      docs: [],
    };
  }

  const temp = productIds
    .slice(1, -1)
    .split(',')
    .map(id => id.trim());

  const _idArray = temp.map(id => new mongoose.Types.ObjectId(id));

  const productOfUseViewDetail = await payload.find({
    collection: 'product',
    where: { _id: { in: _idArray } },
  });

  if (productOfUseViewDetail.docs.length === 0) {
    return {
      docs: [],
    };
  }

  const productCategoriesArray = [];

  for (const productItem of productOfUseViewDetail.docs) {
    const productCategories = productItem.product_categories as any[];
    if (productCategories.length > 0) {
      for (const categoryItem of productCategories) {
        productCategoriesArray.push(categoryItem.id);
      }
    }
  }

  const products = await payload.find({
    collection: 'product',
    where: {
      and: [
        {
          _id: { not_in: _idArray },
        },
        {
          product_categories: { in: productCategoriesArray },
        },
      ],
    },
    page: page,
    limit: limit,
    sort: '-createdAt',
  });

  return products;
};

export const getProductByID = async productId => {
  const products = await payload.findByID({
    collection: 'product',
    id: productId,
  });

  return products;
};

export const getAllProducts = async (productName, page = 1, limit = 10) => {
  if (productName) {
    const products = await payload.find({
      collection: 'product',
      where: { product_name: { like: productName } },
      page: page,
      limit: limit,
      sort: '-createdAt',
    });

    return products;
  } else {
    const products = await payload.find({
      collection: 'product',
      page: page,
      limit: limit,
      sort: '-createdAt',
    });

    return products;
  }
};
