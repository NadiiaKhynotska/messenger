import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';

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
}
