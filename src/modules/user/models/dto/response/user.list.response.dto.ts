import { UserResponseDto } from './user.response.dto';

export class UserListResponseDto {
  data: UserResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
