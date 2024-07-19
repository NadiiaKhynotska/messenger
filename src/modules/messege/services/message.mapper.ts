import * as dotenv from 'dotenv';

import getConfigs from '../../../configs/config';
import { MessageEntity } from '../../../database/entities/message.entity';
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

  // public static toResponseDtoList(
  //   userEntity: UserEntity[],
  // ): UserListResponseDto {
  //   return {
  //     data: userEntity.map(this.toResponseDto),
  //   };
  // }
}
