import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly content: string;
  @IsString()
  readonly receiverId: string;
}
