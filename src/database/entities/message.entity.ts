import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGES)
export class MessageEntity extends BaseModel {
  @Column()
  sender_id: string;
  @ManyToOne(() => UserEntity, (user) => user.sentMessages)
  @JoinColumn({ name: 'sender_id' })
  sender?: UserEntity;

  @Column()
  recipient_id: string;
  @ManyToOne(() => UserEntity, (user) => user.receivedMessages)
  @JoinColumn({ name: 'recipient_id' })
  recipient?: UserEntity;

  @Column('text')
  text: string;

  @Column('simple-array', { nullable: true })
  attachments: string[];
}
