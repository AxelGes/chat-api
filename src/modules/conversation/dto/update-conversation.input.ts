import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateConversationInput } from './create-conversation.input';

export class UpdateConversationInput extends PartialType(CreateConversationInput) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
