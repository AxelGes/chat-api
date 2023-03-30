import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../core/services/base.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {
    super(messageRepository);
  }

  async createMessage(messageInput: CreateMessageInput, currentUser: User): Promise<Message> {
    messageInput.sender = currentUser;

    return super.create(messageInput);
  }
}
