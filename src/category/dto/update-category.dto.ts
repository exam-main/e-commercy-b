import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Yangi nom', description: 'Updated name' })
  name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/new-img.jpg', description: 'Updated image URL' })
  img?: string;

  @ApiPropertyOptional({ example: 'https://example.com/new-icon.png', description: 'Updated icon image URL' })
  icon_img?: string;
}
