import { PickType } from '@nestjs/swagger';

import { BaseMessageRequestDto } from './base-message.request.dto';

export class MessageListRequestDto extends PickType(BaseMessageRequestDto, [
  'limit',
  'offset',
  'recipientId',
]) {}
