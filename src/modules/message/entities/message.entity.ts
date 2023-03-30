import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBase } from '../../../common/models/entity.model';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Message extends EntityBase {
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  sender: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
