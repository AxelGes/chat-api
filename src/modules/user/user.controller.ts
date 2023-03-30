import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Only for CRUD testing purposes

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async findAll(@Param('skip') skip?: number, @Param('take') take?: number): Promise<User[]> {
  //   const options: FindManyOptions = { skip, take };

  //   return this.userService.getAll(options);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // async findById(@Param('id') id: number, @Request() req): Promise<User> {
  //   return this.userService.get({ where: { id } });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.userService.delete({ where: { id } });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put()
  // async update(@Body() entity: UpdateUserInput): Promise<User> {
  //   return this.userService.update({ where: { id: entity.id } }, entity);
  // }

  @Post()
  async create(@Body() entity: CreateUserInput): Promise<User> {
    return this.userService.create(entity);
  }
}
