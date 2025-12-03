import { PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from './create-message.dto';
import { IsBoolean } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsBoolean()
  readonly read: boolean;
}
