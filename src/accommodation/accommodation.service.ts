import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

@Injectable()
export class AccommodationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAccommodationDto) {
    return this.prisma.accommodation.create({ data });
  }

  async findAll() {
    return this.prisma.accommodation.findMany({
      include: { user: true, category: true, contacts: true, ratings: true, likes: true }
    });
  }

  async findOne(id: string) {
    return this.prisma.accommodation.findUnique({
      where: { id },
      include: { user: true, category: true, contacts: true, ratings: true, likes: true }
    });
  }

  async update(id: string, data: UpdateAccommodationDto) {
    return this.prisma.accommodation.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.accommodation.delete({ where: { id } });
  }
}
