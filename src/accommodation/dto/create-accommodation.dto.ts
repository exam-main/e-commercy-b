import { ListingType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
  IsUUID,
} from 'class-validator';

export class CreateAccommodationDto {
  @IsObject()
  @IsNotEmpty()
  img: Record<string, any>;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(ListingType)
  listing_type: ListingType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  adress: string;

  @IsObject()
  @IsOptional()
  features: Record<string, any>;

  @IsNumber()
  price: number;

  @IsNumber()
  disscount: number;

  @IsNumber()
  build_year: number; 

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsObject()
  @IsOptional()
  documents: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  map_url: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsObject()
  @IsOptional()
  extra_features: Record<string, any>;

  @IsUUID()
  user_id: string;

  @IsNumber()
  category_id: number;
}
