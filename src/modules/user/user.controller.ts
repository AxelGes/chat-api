import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Param('skip') skip?: number, @Param('take') take?: number): Promise<User[]> {
    const options: FindManyOptions = { skip, take };

    return this.userService.getAll(options);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.get({ where: { id } });
  }

  @Post()
  async create(@Body() entity: CreateUserInput): Promise<User> {
    return this.userService.create(entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete({ where: { id } });
  }

  @Put()
  async update(@Body() entity: UpdateUserInput): Promise<User> {
    return this.userService.update({ where: { id: entity.id } }, entity);
  }
}
