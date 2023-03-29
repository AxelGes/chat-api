import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
