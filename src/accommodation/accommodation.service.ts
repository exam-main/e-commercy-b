import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { ListingType } from '@prisma/client';

@Injectable()
export class AccommodationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAccommodationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.user_id },
    });
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    const category = await this.prisma.category.findUnique({
      where: { id: data.category_id },
    });
    if (!category) {
      throw new NotFoundException('Kategoriya topilmadi');
    }

    return this.prisma.accommodation.create({
      data: {
        ...data,
        listing_type: data.listing_type as ListingType,
      },
    });
  }

  async findAll() {
    return this.prisma.accommodation.findMany({
      include: {
        user: true,
        category: true,
        contacts: true,
        ratings: true,
        likes: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.accommodation.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
        contacts: true,
        ratings: true,
        likes: true,
      },
    });
  }

  async update(id: string, data: UpdateAccommodationDto) {
    return this.prisma.accommodation.update({
      where: { id },
      data,
    });
  }

  // TO'G'RILANGAN REMOVE METODI
  async remove(id: string) {
    const accommodation = await this.prisma.accommodation.findUnique({
      where: { id },
    });

    if (!accommodation) {
      throw new NotFoundException(`Accommodation with id ${id} topilmadi`);
    }

    return this.prisma.accommodation.delete({
      where: { id },
    });
  }
}
