// src/auth/dto/register-auth.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ enum: ['USER', 'ADMIN'] })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}
