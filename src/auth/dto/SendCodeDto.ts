import { ApiProperty } from '@nestjs/swagger';

export class SendCodeDto {
  @ApiProperty({ example: 'humoyunxudoynazarob@gmail.com' })
  email: string;
}
