import { PickType } from '@nestjs/swagger';

import { BaseMessageRequestDto } from './base-message.request.dto';

export class UpdateMessageDto extends PickType(BaseMessageRequestDto, [
  'attachments',
  'text',
]) {}
