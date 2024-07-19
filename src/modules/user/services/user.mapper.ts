import { UserEntity } from '../../../database/entities/user.entity';
import { UserListRequestDto } from '../models/dto/request/user-list.request.dto';
import { UserListResponseDto } from '../models/dto/response/user.list.response.dto';
import { UserResponseDto } from '../models/dto/response/user.response.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      email: userEntity.email,
      id: userEntity.id,
      name: userEntity.name,
    };
  }

  public static toResponseDtoList(
    entities: UserEntity[],
    total: number,
    query: UserListRequestDto,
  ): UserListResponseDto {
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
