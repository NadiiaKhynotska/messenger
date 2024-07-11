import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    host: process.env.APP_HOST,
  },
  postgres: {
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'access_secret',
    accessTokenExpiration:
      parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRATION) || 3600,
    refreshTokenSecret:
      process.env.AUTH_REFRESH_TOKEN_SECRET || 'refresh_secret',
    refreshTokenExpiration:
      parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRATION) || 86400,
  },
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    objectAcl: process.env.AWS_S3_OBJECT_ACL,
    bucketPath: process.env.AWS_S3_BUCKET_PATH,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    s3Endpoint: process.env.AWS_S3_ENDPOINT,
    s3Region: process.env.AWS_S3_REGION,
  },
});
