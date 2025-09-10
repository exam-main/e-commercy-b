import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // ConfigModule import qilindi
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Butun loyihada global qilib beradi, har joyda import qilish shart emas
    }),
    UserModule,
    PrismaModule,
    AccommodationModule,
    CategoryModule,
    AuthModule,
    MailModule,
  ],
})
export class AppModule {}
