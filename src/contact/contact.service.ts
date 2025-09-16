import { Injectable, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  async create(createContactDto: CreateContactDto) {
    // Bu yerda ma'lumotni emailga yuborish yoki DB saqlash mumkin
    // Misol uchun, hozir oddiy log qilish
    this.logger.log(`Yangi kontakt: ${JSON.stringify(createContactDto)}`);

    // Agar email yubormoqchi bo'lsangiz, nodemailer yoki boshqa kutubxona bilan shu yerda ishlang

    return { message: 'Xabaringiz qabul qilindi, rahmat!' };
  }
}
