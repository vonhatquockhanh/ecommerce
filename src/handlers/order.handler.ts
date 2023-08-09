import { createOrderService, getOrderByUserService } from '../services/order.service';

export const createOrderHandler = async (req, res) => {
  try {
    const headers = req.headers;

    if (headers && headers.authorization) {
      const token = headers.authorization.split(' ')[1];

      const order = await createOrderService(token, req.body.data);
      if (!order) {
        const body = { errors: [{ message: 'Not Found' }] };
        return res.status(404).json(body).end();
      }

      return res.status(200).json({ message: 'success', data: order }).end();
    } else {
      const body = { errors: [{ message: 'Token not found in headers' }] };
      return res.status(404).json(body).end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: `faild ${error}` })
      .end();
  }
};

export const getOrderByUserServiceHandler = async (req, res) => {
  try {
    const headers = req.headers;

    if (headers && headers.authorization) {
      const token = headers.authorization.split(' ')[1];

      const order = await getOrderByUserService(token, req.query.page, req.query.limit);
      if (!order) {
        const body = { errors: [{ message: 'Not Found' }] };
        return res.status(404).json(body).end();
      }

      return res.status(200).json(order).end();
    } else {
      const body = { errors: [{ message: 'Token not found in headers' }] };
      return res.status(404).json(body).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};
