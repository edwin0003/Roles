import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: any) {
    const hash = bcrypt.hashSync(createUserDto.password, 10);
    createUserDto.password = hash;
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  update(id: string, updateUserDto: any) {
    return this.prisma.user.update({ where: { id: id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id: id } });
  }

  findEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
      include: { Persimos: { select: { id: true, name: true } }, rol:{select: {id:true, name:true}} },
    });
  }
}
