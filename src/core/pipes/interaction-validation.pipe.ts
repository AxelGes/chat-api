import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ConversationStatus } from '../../modules/conversation/constants/conversation-status';

@Injectable()
export class InteractionValidationPipe implements PipeTransform {
  transform(value: string): ConversationStatus {
    const upperValue = value.toUpperCase() as keyof typeof ConversationStatus;

    if (!Object.keys(ConversationStatus).includes(upperValue)) {
      throw new BadRequestException(`Invalid interaction value: ${value}`);
    }

    return ConversationStatus[upperValue];
  }
}
