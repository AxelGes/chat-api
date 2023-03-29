import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param('skip') skip?: number, @Param('take') take?: number): Promise<User[]> {
    const options: FindManyOptions = { skip, take };

    return this.userService.getAll(options);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number, @Request() req): Promise<User> {
    console.log(req.user);
    return this.userService.get({ where: { id } });
  }

  @Post()
  async create(@Body() entity: CreateUserInput): Promise<User> {
    return this.userService.create(entity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete({ where: { id } });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() entity: UpdateUserInput): Promise<User> {
    return this.userService.update({ where: { id: entity.id } }, entity);
  }
}
