import payload from '../payload';

export const uploadService = async image => {
  try {
    const data = await payload.create({ collection: 'media', data: {}, file: image });
    return {
      urls: {
        default: data.url,
      },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
