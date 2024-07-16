import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

import getConfigs from '../../../configs/config';

dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;

export const s3ClientMinio = new S3Client({
  region: s3Config.s3Region,
  endpoint: s3Config.bucketPath,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
  forcePathStyle: true,
});
