import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.get({ where: { username } });

    if (!user) {
      throw new BadRequestException('Invalid Credentials.');
    }
    const checkPassword = compareSync(password, user.password);

    if (!checkPassword) {
      throw new BadRequestException('Invalid Credentials.');
    }

    return user;
  }

  async login(input: LoginDto) {
    const user: User = await this.validateUser(input.username, input.password);

    if (!user) {
      throw new BadRequestException('Invalid Credentials.');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
