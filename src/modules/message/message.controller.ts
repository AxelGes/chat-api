import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // Only for CRUD testing purposes

  // @Get()
  // async findAll(@Param('skip') skip?: number, @Param('take') take?: number): Promise<Message[]> {
  //   const options: FindManyOptions = { skip, take };

  //   return this.messageService.getAll(options);
  // }

  // @Get(':id')
  // async findById(@Param('id') id: number): Promise<Message> {
  //   return this.messageService.get({ where: { id } });
  // }

  // @Post()
  // async create(@Body() entity: CreateMessageInput, @Request() req: any): Promise<Message> {
  //   return this.messageService.createMessage(entity, req.user);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.messageService.delete({ where: { id } });
  // }

  // @Put()
  // async update(@Body() entity: UpdateMessageInput): Promise<Message> {
  //   return this.messageService.update(
  //     { where: { id: entity.id } },
  //     entity as QueryDeepPartialEntity<Message>,
  //   );
  // }

  @Post('send')
  async sendMessage(
    @Body() sendMessageInput: SendMessageInput,
    @Request() req: any,
  ): Promise<Message> {
    return this.messageService.sendMessage(sendMessageInput, req.user);
  }
}
