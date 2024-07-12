import { Exclude } from 'class-transformer';

import { UserResponseDto } from '../../../user/models/dto/response/user.response.dto';
import { TokenResponseDto } from './token.response.dto';

@Exclude()
export class AuthUserResponseDto {
  tokens: TokenResponseDto;
  user: UserResponseDto;
}
