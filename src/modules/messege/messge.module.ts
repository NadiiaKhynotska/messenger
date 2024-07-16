import { Module } from '@nestjs/common';

import { MessageController } from './messege.contoller';
import { MessagesService } from './services/messege.service';
import { S3Service } from './services/s3.service';

@Module({
  controllers: [MessageController],
  providers: [MessagesService, S3Service],
  exports: [],
})
export class MessageModule {}
