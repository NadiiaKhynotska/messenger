import * as path from 'node:path';

import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';

import getConfigs from '../../../configs/config';
import { s3ClientMinio } from '../configs/minio-config';

dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  constructor() {
    this.client = s3ClientMinio;
  }

  async uploadFileToS3(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    const filePath = this.buildPath(file.originalname, userId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: s3Config.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: s3Config.objectAcl as ObjectCannedACL,
        ContentLength: file.size,
      }),
    );
    return filePath;
  }

  private buildPath(fileName: string, userId: string): string {
    return `users/${userId}/${v4()}${path.extname(fileName)}`;
  }
}
