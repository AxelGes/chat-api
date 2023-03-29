import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BaseService } from '../../core/services/base.service';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(user: CreateUserInput): Promise<User> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = await hash(user.password, 12);

    return super.create(newUser);
  }

  async update(options: FindOneOptions<User>, updateInput: QueryDeepPartialEntity<User>) {
    // remove password from updateInput
    delete updateInput.password;

    return super.update(options, updateInput);
  }
}
