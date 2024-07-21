import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { MessageEntity } from '../../../database/entities/message.entity';
import { MessageListRequestDto } from '../../messege/models/dto/request/message-list.request.dto';

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

  public async getAllForUser(
    userId: string,
    query: MessageListRequestDto,
  ): Promise<[MessageEntity[], number]> {
    const qb = this.createQueryBuilder('message')
      .where(
        '(message.sender = :userId AND message.recipient = :recipientId) OR (message.sender = :recipientId AND message.recipient_id = :userId)',
        { userId, recipientId: query.recipientId },
      )
      .orderBy('message.created', 'DESC')
      .take(query.limit)
      .skip(query.offset);

    const [messages, total] = await qb.getManyAndCount();
    return [messages, total];
  }
}
