import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { ResponseMessageDto } from './dto/response-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async findAll(paginationDto?: PaginationDto): Promise<ResponseMessageDto[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    const allEntities = await this.prisma.message.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'asc',
      },
    });
    return allEntities;
  }

  async findMyMessages(
    tokenPayload: PayloadTokenDto,
  ): Promise<ResponseMessageDto[]> {
    const entities = await this.prisma.message.findMany({
      where: {
        receiverId: tokenPayload.sub.toString(),
      },
    });

    if (entities) return entities;

    throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND);
  }

  async store(
    body: CreateMessageDto,
    tokenPayload: PayloadTokenDto,
  ): Promise<ResponseMessageDto> {
    try {
      const newEntity = await this.prisma.message.create({
        data: {
          content: body.content,
          senderId: tokenPayload.sub.toString(),
          receiverId: body.receiverId,
          read: false,
        },
      });
      return newEntity;
    } catch (err) {
      console.log(err);
      throw new HttpException('Store fail', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    body: UpdateMessageDto,
  ): Promise<ResponseMessageDto> {
    try {
      const findResult = await this.prisma.message.findFirst({
        where: {
          id: id,
        },
      });

      if (!findResult) {
        throw new HttpException(
          'Registro não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const task = await this.prisma.message.update({
        where: {
          id: findResult.id,
        },
        data: {
          content: body.content != '' ? body.content : findResult.content,
          read: body.read !== undefined ? body.read : findResult.read,
        },
      });

      return task;
    } catch (err) {
      console.log(err);
      throw new HttpException('Update fail', HttpStatus.BAD_REQUEST);
    }
  }
}
