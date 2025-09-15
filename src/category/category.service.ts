import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  // Create
  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  // Find all
  async findAll() {
    return this.prisma.category.findMany({
      include: { accommodations: true },
    });
  }

  // Find one by ID
  async findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { accommodations: true },
    });
  }

  // Update
  async update(id: number, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  // Remove (with foreign key fix)
  async remove(id: number) {
    // 1. Avval bog‘langan Accommodation yozuvlarini o‘chiramiz
    await this.prisma.accommodation.deleteMany({
      where: { category_id: id },
    });


    // 2. Keyin Category’ni o‘chiramiz
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
