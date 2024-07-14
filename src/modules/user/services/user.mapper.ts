import { UserEntity } from '../../../database/entities/user.entity';
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
    userEntity: UserEntity[],
  ): UserListResponseDto {
    return {
      data: userEntity.map(this.toResponseDto),
    };
  }
}
