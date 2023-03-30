import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../core/services/base.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ConversationStatus } from './constants/conversation-status';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ConversationService extends BaseService<Conversation> {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    private readonly userService: UserService,
  ) {
    super(conversationRepository);
  }

  async getConversationsForCurrentUser(currentUser: User) {
    const user = await this.userService.get({ where: { id: currentUser.id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find all conversations where the user is either the creator or recipient
    const conversations = await super.getAll({
      where: [{ creator: { id: user.id } }, { recipient: { id: user.id } }],
      relations: ['creator', 'recipient', 'messages'],
    });

    return conversations;
  }

  async interactConversation(
    conversationId: number,
    interaction: ConversationStatus,
    currentUser: User,
  ) {
    const conversation = await super.get({
      where: { id: conversationId },
      relations: ['creator', 'recipient'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check if the current user is the recipient of the conversation
    if (conversation.recipient.id !== currentUser.id) {
      throw new NotFoundException('Conversation not found');
    }

    // Update the conversation status
    conversation.status = interaction;

    return super.update({ where: { id: conversation.id } }, conversation as Conversation);
  }
}
