import { DbNames } from '../enum/DbNames';

export default Object.assign({
  VERSION: '1.0.0',
  NAME: 'BLOG API',
  BIND_PORT: process.env.PORT,
});

export const MONGO_DB = {
  HOST: process.env.MONGO_DB_HOST || 'localhost',
  PORT: process.env.MONGO_DB_PORT || 27017,
  USER: process.env.MONGO_DB_USER || null,
  PASS: process.env.MONGO_DB_PASS || null,
  AUTH_SRC: process.env.MONGO_DB_AUTH_SRC || null,
  DEFAULT_DATABASE: process.env.MONGO_DB_DEFAULT_DATABASE || DbNames.DB,
};

export const REDIS = {
  REDIS_URL: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

export const SECRET_CODE = {
  AUTHENTICATION_SECRET: process.env.AUTHENTICATION_SECRET,
};

export const AWS_SECRET = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_BUCKET_LINK: process.env.S3_BUCKET_LINK,
};
