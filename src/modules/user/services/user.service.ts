import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserDto } from '../models/dto/request/update-user.dto';
import { UserResponseDto } from '../models/dto/response/user.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findMe(userData: IUserData): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDto(entity);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    await this.userRepository.save(this.userRepository.merge(entity, dto));
    return UserMapper.toResponseDto(entity);
  }

  public async getPublicUser(userId: string): Promise<UserResponseDto> {
    const entity = await this.userRepository.getById(userId);
    return UserMapper.toResponseDto(entity);
  }

  private async findByIdOrThrow(userId: string): Promise<UserEntity> {
    const entity = await this.userRepository.findOneBy({ id: userId });
    if (!entity) {
      throw new UnprocessableEntityException('User not found');
    }
    return entity;
  }
  public async isEmailUniqOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email must be unique.');
    }
  }

  public async delete(userData: IUserData, userId: string): Promise<void> {
    const user = await this.findByIdOrThrow(userId);
    if (user.id !== userData.userId) {
      throw new ConflictException('You can not delete this user');
    }
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
    await this.userRepository.delete({
      id: userData.userId,
    });
  }
}
