import * as dotenv from 'dotenv';

import getConfigs from '../../../configs/config';
import { MessageEntity } from '../../../database/entities/message.entity';
import { MessageListRequestDto } from '../models/dto/request/message-list.request.dto';
import { MessageListResponseDto } from '../models/dto/response/message-list.resopnse.dto';
import { ResponseMessageDto } from '../models/dto/response/response-message.dto';

dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;

export class MessageMapper {
  public static toResponseDto(
    messageEntity: MessageEntity,
  ): ResponseMessageDto {
    return {
      id: messageEntity.id,
      text: messageEntity.text,
      attachments: messageEntity?.attachments
        ? messageEntity.attachments.map(
            (url) => `${s3Config.bucketPath}/${url}`,
          )
        : null,
      sender_id: messageEntity.sender_id,
      recipient_id: messageEntity.recipient_id,
    };
  }

  public static toListResponseDto(
    entities: MessageEntity[],
    query: MessageListRequestDto,
    total: number,
  ): MessageListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
