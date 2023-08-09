import payload from '../payload';
import axios from 'axios';

export const createOrder = async (token, data) => {
  try {
    const profileUser = await axios.get(`${process.env.DOMAIN_AEYES_URL}/api/v1/auth/customer/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!profileUser?.data) {
      throw new Error('not found');
    }

    let totalPrice = 0;

    data.variant.forEach(item => {
      totalPrice += item.total_price * item.quantity_buy;
    });

    const bodyInput = Object.assign(data, {
      userId: profileUser?.data?._id,
      first_name: profileUser?.data?.first_name,
      last_name: profileUser?.data?.last_name,
      email: profileUser?.data?.email,
      phone: profileUser?.data?.phone,
      total_price: totalPrice,
    });

    await payload.create({
      collection: 'order',
      data: bodyInput,
    });

    return { success: true };
  } catch (error) {
    return null;
  }
};

export const getOrderByUser = async (token, page = 1, limit = 10) => {
  const profileUser = await axios.get(`${process.env.DOMAIN_AEYES_URL}/api/v1/auth/customer/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!profileUser?.data) {
    throw new Error('not found');
  }

  const orders = await payload.find({
    collection: 'order',
    where: { userId: { equals: profileUser?.data?._id } }, 
    page: page,
    limit: limit,
    sort: '-createdAt',
  });

  return orders;
};
