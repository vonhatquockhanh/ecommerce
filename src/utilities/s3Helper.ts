import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

export const buildAdapter = () => {
  return s3Adapter({
    config: {
      endpoint: `${process?.env?.S3_PROTOCOL || 'https'}://s3.${process?.env?.S3_REGION || 'https'}.${
        process?.env?.S3_DOMAIN
      }`,
      region: process?.env?.S3_REGION,
    },
    bucket: process?.env?.S3_BUCKET,
  });
};
