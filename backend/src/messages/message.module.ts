import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/exception.filter';

@Module({
  imports: [PrismaModule],
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    {
      provide: 'KEY_TOKEN',
      useValue: 'token_123456789',
    },
  ],
})
export class MessageModule {}
