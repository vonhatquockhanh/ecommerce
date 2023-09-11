import {
  createAddressManagementService,
  updateAddressManagementService,
  getAllAddressManagementService,
} from '../services/address_management.service';

export const createAddressManagementHandler = async (req, res) => {
  try {
    const headers = req.headers;

    if (headers && headers.authorization) {
      const token = headers.authorization.split(' ')[1];

      const addressManagement = await createAddressManagementService(token, req.body);

      if (!addressManagement) {
        const body = { errors: [{ message: 'Not Found' }] };
        return res.status(404).json(body).end();
      }

      return res.status(200).json({ message: 'success', data: addressManagement }).end();
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

export const updateAddressManagementHandler = async (req, res) => {
  try {
    const headers = req.headers;

    if (headers && headers.authorization) {
      const token = headers.authorization.split(' ')[1];
      const addressManagement = await updateAddressManagementService(token, req.params.id, req.body);

      if (!addressManagement) {
        const body = { errors: [{ message: 'Not Found' }] };
        return res.status(404).json(body).end();
      }

      return res.status(200).json({ message: 'success', data: addressManagement }).end();
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

export const getAllAddressManagementHandler = async (req, res) => {
  try {
    const headers = req.headers;

    if (headers && headers.authorization) {
      const token = headers.authorization.split(' ')[1];

      const addressManagement = await getAllAddressManagementService(token, req.query.page, req.query.limit);
      if (!addressManagement) {
        const body = { errors: [{ message: 'Not Found' }] };
        return res.status(404).json(body).end();
      }

      return res.status(200).json(addressManagement).end();
    } else {
      const body = { errors: [{ message: 'Token not found in headers' }] };
      return res.status(404).json(body).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error! An error occurred. Please try again later' }).end();
  }
};
