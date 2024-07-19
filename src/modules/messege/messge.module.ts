import { Module } from '@nestjs/common';

import { EventsGateway } from './events/events.gateway';
import { MessageController } from './messege.contoller';
import { MessagesService } from './services/messege.service';
import { S3Service } from './services/s3.service';

@Module({
  controllers: [MessageController],
  providers: [MessagesService, S3Service, EventsGateway],
  exports: [MessagesService, S3Service],
})
export class MessageModule {}
