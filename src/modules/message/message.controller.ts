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
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param('skip') skip?: number, @Param('take') take?: number): Promise<Message[]> {
    const options: FindManyOptions = { skip, take };

    return this.messageService.getAll(options);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Message> {
    return this.messageService.get({ where: { id } });
  }

  @Post()
  async create(@Body() entity: CreateMessageInput, @Request() req: any): Promise<Message> {
    return this.messageService.createMessage(entity, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.messageService.delete({ where: { id } });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() entity: UpdateMessageInput): Promise<Message> {
    return this.messageService.update(
      { where: { id: entity.id } },
      entity as QueryDeepPartialEntity<Message>,
    );
  }
}
