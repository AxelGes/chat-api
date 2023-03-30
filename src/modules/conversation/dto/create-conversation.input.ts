import { IsOptional, IsString } from 'class-validator';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entity';
import { ConversationStatus } from '../constants/conversation-status';

export class CreateConversationInput {
  @IsOptional()
  creator: User;

  @IsOptional()
  recipient: User;

  @IsString()
  @IsOptional()
  status: ConversationStatus;

  @IsOptional()
  messages: Message[];
}
