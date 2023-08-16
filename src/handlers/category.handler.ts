import { getCategoryBySlugService, getAllCategoryAtLeastOneProductService } from '../services/category.service';

export const getCategoryBySlugHandler = async (req, res) => {
  try {
    const posts = await getCategoryBySlugService(req.params.slug);
    if (!posts) {
      const body = { errors: [{ message: 'Không tìm thấy danh mục yêu cầu.' }] };
      return res.status(404).json(body).end();
    }

    return res.status(200).json({ message: 'Thành công', data: posts }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Đã xảy ra lỗi' }).end();
  }
};

export const getAllCategoryAtLeastOneProductHandler = async (req, res) => {
  try {
    const posts = await getAllCategoryAtLeastOneProductService(req.query.page, req.query.limit);
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
