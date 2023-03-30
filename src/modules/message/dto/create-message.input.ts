import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateMessageInput {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  sender: User;
}
