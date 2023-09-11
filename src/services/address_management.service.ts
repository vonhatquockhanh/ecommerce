import {
  createAddressManagement,
  updateAddressManagement,
  getAllAddressManagement,
} from '../repositories/address_management.repository';

export const createAddressManagementService = async (token, data) => {
  return await createAddressManagement(token, data);
};

export const updateAddressManagementService = async (token, id, data) => {
  return await updateAddressManagement(token, id, data);
};

export const getAllAddressManagementService = async (token, page = 1, limit = 10) => {
  const listAddressManagement = await getAllAddressManagement(token, page, limit);
  if (listAddressManagement.docs.length < 1) {
    return null;
  }
  return listAddressManagement;
};
