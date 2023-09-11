import payload from '../payload';
import axios from 'axios';

export const createAddressManagement = async (token, data) => {
  try {
    const profileUser: any = await axios.post(
      `${process.env.DOMAIN_AEYES_URL}/api/v1/auth/customer/me`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!profileUser?.data) {
      throw new Error('not found');
    }

    const bodyInput = Object.assign(data, {
      userId: profileUser?.data?._id,
    });

    await payload.create({
      collection: 'address_management',
      data: bodyInput,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateAddressManagement = async (token, id, data) => {
  try {
    const profileUser: any = await axios.post(
      `${process.env.DOMAIN_AEYES_URL}/api/v1/auth/customer/me`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!profileUser?.data) {
      throw new Error('not found');
    }

    const bodyInput = Object.assign(data, {
      userId: profileUser?.data?._id,
    });

    await payload.update({
      collection: 'address_management',
      id: id,
      data: bodyInput,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllAddressManagement = async (token, page = 1, limit = 10) => {
  try {
    const profileUser: any = await axios.post(
      `${process.env.DOMAIN_AEYES_URL}/api/v1/auth/customer/me`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!profileUser?.data) {
      throw new Error('not found');
    }

    const listAddressManagement = await payload.find({
      collection: 'address_management',
      where: { userId: { equals: profileUser?.data?._id } },
      page: page,
      limit: limit,
      sort: '-createdAt',
    });

    return listAddressManagement;
  } catch (error) {
    console.log(error);
    return null;
  }
};
