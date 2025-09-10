import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Post()
  create(@Body() data: CreateAccommodationDto) {
    return this.accommodationService.create(data);
  }

  @Get()
  findAll() {
    return this.accommodationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accommodationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateAccommodationDto) {
    return this.accommodationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accommodationService.remove(id);
  }
}
