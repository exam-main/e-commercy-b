import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Uylar', description: 'Category name' })
  name: string;

  @ApiProperty({ example: 'https://example.com/img.jpg', description: 'Main image URL' })
  img: string;

  @ApiProperty({ example: 'https://example.com/icon.png', description: 'Icon image URL' })
  icon_img: string;
}
