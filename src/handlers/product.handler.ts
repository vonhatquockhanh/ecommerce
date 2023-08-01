import {
  getProductByCategorieIDService,
  getProductByTypeService,
  getProductBySectionIDService,
  getProductByProductNameService,
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
