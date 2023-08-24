import {
  getProductByCategorieIDService,
  getProductByTypeService,
  getProductBySectionIDService,
  getProductByProductNameService,
  getProductByCategorieIDV2Service,
  getProductSectionV1Service,
  getSuitableProductForUserService,
  getProductByListCategorieIDService,
  getProductByIDService,
  getAllProductsService,
  getSupplierByProductByIDService,
  generateSlugService,
  getProductBySlugService
} from '../services/product.service';

export const getProductByCategorieIDHandler = async (req, res) => {
  try {
    const posts = await getProductByCategorieIDService(req.params.categorieId, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductByCategorieIDV2Handler = async (req, res) => {
  try {
    const posts = await getProductByCategorieIDV2Service(req.params.categorieId, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductByListCategorieIDHandler = async (req, res) => {
  try {
    const posts = await getProductByListCategorieIDService(req.query.categorieIds, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductByTypeHandler = async (req, res) => {
  try {
    const posts = await getProductByTypeService(req.params.productType, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductBySectionIDHandler = async (req, res) => {
  try {
    const posts = await getProductBySectionIDService(req.params.sectionId, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductByProductNameHandler = async (req, res) => {
  try {
    const posts = await getProductByProductNameService(req.query.productName, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductSectionV1Handler = async (req, res) => {
  try {
    const posts = await getProductSectionV1Service(req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getSuitableProductForUserHandler = async (req, res) => {
  try {
    const posts = await getSuitableProductForUserService(req.query.productIds, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductByIDHandler = async (req, res) => {
  try {
    const posts = await getProductByIDService(req.params.productId);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getAllProductsHandler = async (req, res) => {
  try {
    const posts = await getAllProductsService(req.query?.productName, req.query.page, req.query.limit);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getSupplierByProductByIDHandler = async (req, res) => {
  try {
    const posts = await getSupplierByProductByIDService(req.params.productId);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const generateSlugHandler = async (req, res) => {
  try {
    const posts = await generateSlugService(req.query.productName);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json({ slug: posts}).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};

export const getProductBySlugHandler = async (req, res) => {
  try {
    const posts = await getProductBySlugService(req.query.slug);
    if (!posts) {
      const body = { errors: [{ message: 'Not Found' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json(posts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};