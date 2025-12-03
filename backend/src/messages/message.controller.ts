import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Listar todas as mensagens' })
  @ApiBearerAuth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messageService.findAll(paginationDto);
  }

  @Get('my')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Listar as mensagens do usuário logado' })
  @ApiBearerAuth()
  findMyMessages(@TokenPayloadParam() tokenPayload: PayloadTokenDto) {
    return this.messageService.findMyMessages(tokenPayload);
  }

  @Post()
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Gravar uma nova mensagem' })
  @ApiBearerAuth()
  create(
    @Body() body: CreateMessageDto,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.messageService.store(body, tokenPayload);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Atualizar dados de uma mensagem' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() body: UpdateMessageDto) {
    return this.messageService.update(id, body);
  }
}
