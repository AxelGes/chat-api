import { Column, Entity, OneToMany } from 'typeorm';
import { EntityBase } from '../../../common/models/entity.model';
import { Message } from '../../message/entities/message.entity';

@Entity()
export class User extends EntityBase {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  // @OneToMany(() => Conversation, (conversation) => conversation.creator)
  // createdConversations: Conversation[];

  // @OneToMany(() => Conversation, (conversation) => conversation.recipient)
  // receivedConversations: Conversation[];

  // get conversations(): Conversation[] {
  //   return [...this.createdConversations, ...this.receivedConversations];
  // }
}
