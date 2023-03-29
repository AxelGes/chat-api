import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserInput } from '../dto/create-user.input';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
