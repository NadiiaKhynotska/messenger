import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserListRequestDto } from '../../user/models/dto/request/user-list.request.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getById(userId: string) {
    const qb = this.createQueryBuilder('user');
    qb.where('user.id = :userId');
    qb.setParameter('userId', userId);
    return await qb.getOne();
  }
  public async findByIdOrThrow(userId: string) {
    const userEntity = await this.findOneBy({ id: userId });
    if (!userEntity) {
      throw new UnprocessableEntityException('User not found');
    }
    return userEntity;
  }

  public async getAll(
    query: UserListRequestDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
