import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../../../common/models/entity.model';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entity';
import { ConversationStatus } from '../constants/conversation-status';

@Entity()
export class Conversation extends EntityBase {
  @ManyToOne(() => User, (user) => user.createdConversations, { nullable: false })
  creator: User;

  @ManyToOne(() => User, (user) => user.receivedConversations, { nullable: false })
  recipient: User;

  @Column({ type: 'enum', enum: ConversationStatus, default: ConversationStatus.PENDING })
  status: ConversationStatus;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
