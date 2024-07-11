import { Column, Entity, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGES)
export class MessageEntity extends BaseModel {
  @ManyToOne(() => UserEntity, (user) => user.sentMessages)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedMessages)
  recipient: UserEntity;

  @Column('text')
  text: string;

  @Column('simple-array', { nullable: true })
  attachments: string[];
}
