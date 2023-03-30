import { Controller, Get, Param, Put, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Conversation } from './entities/conversation.entity';
import { ConversationService } from './conversation.service';
import { ConversationStatus } from './constants/conversation-status';
import { InteractionValidationPipe } from '../../core/pipes/interaction-validation.pipe';

@UseGuards(JwtAuthGuard)
@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  // Only for CRUD testing purposes

  // @Get()
  // async findAll(
  //   @Param('skip') skip?: number,
  //   @Param('take') take?: number,
  // ): Promise<Conversation[]> {
  //   const options: FindManyOptions = { skip, take };

  //   return this.conversationService.getAll(options);
  // }

  // @Get(':id')
  // async findById(@Param('id') id: number): Promise<Conversation> {
  //   return this.conversationService.get({ where: { id } });
  // }

  // @Post()
  // async create(
  //   @Body() entity: CreateConversationInput,
  //   @Request() req: any,
  // ): Promise<Conversation> {
  //   return this.conversationService.create(entity);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.conversationService.delete({ where: { id } });
  // }

  // @Put()
  // async update(@Body() entity: UpdateConversationInput): Promise<Conversation> {
  //   return this.conversationService.update(
  //     { where: { id: entity.id } },
  //     entity as QueryDeepPartialEntity<Conversation>,
  //   );
  // }

  @Put('interact/:id/:interaction')
  async interactConversation(
    @Param('id') id: number,
    @Param('interaction', InteractionValidationPipe) interaction: ConversationStatus,
    @Request() req: any,
  ): Promise<Conversation> {
    return this.conversationService.interactConversation(id, interaction, req.user);
  }

  @Get('user')
  async getConversationsForCurrentUser(@Request() req: any) {
    return this.conversationService.getConversationsForCurrentUser(req.user);
  }
}
