import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Contact')  
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Contact formdan xabar yuborish' })
  @ApiBody({ type: CreateContactDto, description: 'Contact form ma\'lumotlari' })
  @ApiResponse({ status: 201, description: 'Xabar muvaffaqiyatli qabul qilindi.' })
  @ApiResponse({ status: 400, description: 'Ma\'lumot noto\'g\'ri kiritildi.' })
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }
}
