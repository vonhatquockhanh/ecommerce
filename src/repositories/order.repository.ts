import payload from '../payload';
import axios from 'axios';

export const createOrder = async (token, data) => {
  try {
    const profileUser: any = await axios.post(`${process.env.DOMAIN_AEYES_URL}/api/v1/auth/customer/me`, { }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!profileUser?.data) {
      throw new Error('not found');
    }

    let totalPrice = 0;

    data.variant.forEach(item => {
      totalPrice += item.total_price * item.quantity_buy;
    });

    // supplierId
    let supplierId;

    if (data && data?.product) {
      const productInfo:any = await payload.findByID({
        collection: 'product',
        id: data?.product,
      });

      supplierId = productInfo?.supplierId?.id;
    }

    const newOrderId = await generateOrderId();

    const bodyInput = Object.assign(data, {
      order_id: newOrderId,
      userId: profileUser?.data?._id,
      first_name: profileUser?.data?.first_name,
      last_name: profileUser?.data?.last_name,
      email: profileUser?.data?.email,
      phone: profileUser?.data?.phone,
      supplierId: supplierId,
      total_price: totalPrice,
    });

    await payload.create({
      collection: 'order',
      data: bodyInput
    });

    return { success: true };
  } catch (error) {
    console.log(error)
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

export const generateOrderId = async () => {
  try {
    const counterData = await payload.find({
      collection: 'counter',
      where: { collection_name: { equals: 'order' } },
      limit: 1,
    });

    let newSeq = 0;

    if (!counterData || !counterData.docs || !counterData.docs.length) {
      newSeq = 1;

      await payload.create({
        collection: 'counter',
        data: {
          collection_name: 'order',
          seq: newSeq,
        },
      });
    } else {
      newSeq = Number(counterData.docs[0].seq) + 1;

      await payload.update({
        collection: 'counter',
        id: counterData.docs[0].id,
        data: { seq: newSeq },
      });
    }

    // Construct the tracking number
    const newOrderId = (nr, len = 6, chr = `0`) => `${nr}`.padStart(len, chr);

    return `OID-${newOrderId(newSeq)}`;
  } catch (error) {
    console.log(error);
    return null;
  }
};
