import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMessageInput } from './create-message.input';

export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
