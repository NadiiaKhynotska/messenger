import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from './base-user.request.dto';

export class UpdateUserDto extends PickType(BaseUserRequestDto, ['name']) {}
