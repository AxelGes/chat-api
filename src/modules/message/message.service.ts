import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../core/services/base.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { User } from '../user/entities/user.entity';
import { SendMessageInput } from './dto/send-message.input';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';
import { ConversationStatus } from '../conversation/constants/conversation-status';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {
    super(messageRepository);
  }

  async createMessage(messageInput: CreateMessageInput, currentUser: User): Promise<Message> {
    messageInput.sender = currentUser;

    return super.create(messageInput);
  }

  async sendMessage(sendMessageInput: SendMessageInput, currentUser: User): Promise<Message> {
    const sender = currentUser;
    const recipient = await this.userService.get({
      where: { id: sendMessageInput.recipientId },
    });

    if (!sender || !recipient || sender.id === recipient.id) {
      throw new NotFoundException('Sender or recipient not found');
    }

    // Check if there is an existing conversation between the sender and recipient
    let conversation = await this.conversationService.get({
      where: [
        { creator: { id: sender.id }, recipient: { id: recipient.id } },
        { creator: { id: recipient.id }, recipient: { id: sender.id } },
      ],
      relations: ['creator', 'recipient'],
    });

    // Create a new conversation if it doesn't exist
    if (!conversation) {
      conversation = await this.conversationService.create({
        creator: sender,
        recipient,
      });
    }

    // If the conversation is pending and the sender is the recipient, update the conversation status to accepted
    if (
      conversation.status === ConversationStatus.PENDING &&
      conversation.recipient.id === sender.id
    ) {
      conversation.status = ConversationStatus.ACCEPTED;
      await this.conversationService.update({ where: { id: conversation.id } }, conversation);
    }

    // Create the message
    return this.createMessage(
      {
        conversation,
        sender,
        content: sendMessageInput.content,
      },
      currentUser,
    );
  }
}
