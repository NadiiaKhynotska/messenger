export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
  s3: S3Config;
};
export type AppConfig = {
  host: string;
  port: number;
};
export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};

export type JWTConfig = {
  accessTokenSecret: string;
  accessTokenExpiration: number;
  refreshTokenSecret: string;
  refreshTokenExpiration: number;
};

export type S3Config = {
  accessKeyId: string;
  secretAccessKey: string;
  objectAcl: string;
  bucketPath: string;
  bucketName: string;
  s3Endpoint: string;
  s3Region: string;
};
