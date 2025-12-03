import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiBearerAuth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Listar as mensagens de um usuário' })
  @ApiBearerAuth()
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  create(@Body() body: CreateUserDto) {
    return this.userService.store(body);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar dados de um usuário' })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um usuário' })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
