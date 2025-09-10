import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.ssto';  
import { Role } from 'src/Common/Enums/role.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


 async createUser(data: { firstname: string; lastname: string; email: string; password: string; role: Role; phone: string }) {
  // prisma create chaqiruvi
  return this.prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,  
    },
  });
}


  
  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

 
  async findAll() {
    return this.prisma.user.findMany({
      include: { accommodations: true, ratings: true, likes: true, contacts: true },
    });
  }


  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { accommodations: true, ratings: true, likes: true, contacts: true },
    });
  }

  
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  
  async update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

 
  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
