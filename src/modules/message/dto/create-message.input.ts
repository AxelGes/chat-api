import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entities/user.entity';

export class CreateMessageInput {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  sender: User;

  @IsOptional()
  conversation: Conversation;
}
