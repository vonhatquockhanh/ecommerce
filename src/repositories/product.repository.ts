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

export const getSupplierByProductByID = async productId => {
  const products = await payload.findByID({
    collection: 'product',
    id: productId,
  });

  return products?.supplierId;
};

export const generateSlug = async (productName) => {
  let sanitizedProductName = removeUnicode(productName.trim());
  sanitizedProductName = ConvertToSlug(sanitizedProductName);

  let newSlug = sanitizedProductName;
  let counter = 1;

  while (true) {
    const existingProducts = await payload.find({
      collection: 'product',
      where: { slug: { equals: newSlug } },
    });

    if (!existingProducts || existingProducts.docs.length === 0) {
      return newSlug; // Slug does not exist, return
    }

    newSlug = `${sanitizedProductName}-${counter}`;
    counter++;
  }
};

export const getProductBySlug = async (slug) => {
  console.log(slug);
  
  const prod = await payload.find({
    collection: 'product',
    where: { slug: { equals: slug } },
  });

  return prod;
};

export const ConvertToSlug = (text: string) => {
  let textReplace = text.trim();
  textReplace = textReplace.replace('-', '');
  textReplace = textReplace.replace('  ', ' ');
  return textReplace
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
};

export const removeUnicode = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
};