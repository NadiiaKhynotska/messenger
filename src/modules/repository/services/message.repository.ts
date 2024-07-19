import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { MessageEntity } from '../../../database/entities/message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.manager);
  }

  public async findByIdOrThrow(messageId: string) {
    const messageEntity = await this.findOneBy({ id: messageId });
    if (!messageEntity) {
      throw new UnprocessableEntityException('Message not found');
    }
    return messageEntity;
  }
}
