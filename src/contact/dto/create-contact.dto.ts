import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe', description: 'To‘liq ism' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '+998971234567', description: 'Telefon raqam' })
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ example: 'Salom, yordam kerak.', description: 'Xabar matni' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
