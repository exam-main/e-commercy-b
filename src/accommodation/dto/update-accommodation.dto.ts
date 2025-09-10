import { ListingType } from '@prisma/client';

export class UpdateAccommodationDto {
  img?: object;
  isActive?: boolean;
  listing_type?: ListingType;
  title?: string;
  adress?: string;
  features?: object;
  price?: number;
  disscount?: number;
  build_year?: bigint;
  description?: string;
  documents?: object;
  map_url?: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  extra_features?: object;
  user_id?: string;
  category_id?: number;
}
