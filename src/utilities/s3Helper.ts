import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

export const buildAdapter = () => {
  return s3Adapter({
    config: {
      endpoint: `${process?.env?.S3_PROTOCOL || 'https'}://s3.${process?.env?.S3_REGION || 'https'}.${
        process?.env?.S3_DOMAIN
      }`,
      region: process?.env?.S3_REGION,
      credentials: {
        accessKeyId: process?.env?.S3_ACCESS_KEY,
        secretAccessKey: process?.env?.S3_SECRET_KEY,
      },
    },
    bucket: process?.env?.S3_BUCKET,
  });
};
