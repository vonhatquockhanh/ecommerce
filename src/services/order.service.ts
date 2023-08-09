import { createOrder, getOrderByUser } from '../repositories/order.repository';

export const createOrderService = async (token, data) => {
  return await createOrder(token, data);;
}

export const getOrderByUserService = async (token, page = 1, limit = 10) => {
  const order = await getOrderByUser(token, page, limit);
  if (order.docs.length < 1) {
    return null;
  }
  return order;
}
