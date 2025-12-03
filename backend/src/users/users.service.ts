import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import {
  ResponseCreateUserDto,
  ResponseFindOneUserDto,
} from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    return users;
  }
  async findOneById(id: string): Promise<ResponseFindOneUserDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (user) return user;

    throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND);
  }
  async store(body: CreateUserDto): Promise<ResponseCreateUserDto> {
    try {
      const passwordHash = await this.hashingService.hash(body.passwordHash);
      const user = await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          passwordHash: passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (err) {
      throw new HttpException('Store fail', HttpStatus.BAD_REQUEST);
    }
  }
  async update(
    id: string,
    body: UpdateUserDto,
  ): Promise<ResponseCreateUserDto> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new HttpException(
          'Registro não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const dataUser: { name?: string; passwordHash?: string } = {
        name: body.name ? body.name : user.name,
      };

      if (body.passwordHash) {
        const passwordHash = await this.hashingService.hash(body.passwordHash);
        dataUser['passwordHash'] = passwordHash;
      }

      const updateUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: dataUser.name,
          passwordHash: dataUser.passwordHash
            ? dataUser.passwordHash
            : user.passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return updateUser;
    } catch (err) {
      throw new HttpException('Update fail', HttpStatus.BAD_REQUEST);
    }
  }
  async delete(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new HttpException(
          'Registro não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      return {
        message: true,
      };
    } catch (err) {
      throw new HttpException('Delete fail', HttpStatus.BAD_REQUEST);
    }
  }
}
