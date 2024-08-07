import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from './base-user.request.dto';

export class UserListRequestDto extends PickType(BaseUserRequestDto, [
  'limit',
  'offset',
]) {}
