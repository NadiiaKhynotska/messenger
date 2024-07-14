import { PickType } from '@nestjs/swagger';

import { BaseMessageRequestDto } from './base-message.request.dto';

export class CreateMessageRequestDto extends PickType(BaseMessageRequestDto, [
  'attachments',
  'sender_id',
  'recipient_id',
  'text',
]) {}
