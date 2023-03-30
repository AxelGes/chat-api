import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class SendMessageInput {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  sender: User;

  @IsOptional()
  recipient: User;

  @IsNotEmpty()
  @IsNumber()
  recipientId: number;
}
