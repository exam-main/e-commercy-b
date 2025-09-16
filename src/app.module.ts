import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static'; // 🆕 Qo‘shildi
import { join } from 'path'; // 🆕 path uchun

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './email/email.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),


    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  
      serveRoot: '/uploads',
    }),

    // 🔁 Qolgan modullar
    UserModule,
    PrismaModule,
    AccommodationModule,
    CategoryModule,
    AuthModule,
    MailModule,
    ContactModule,
  ],
})
export class AppModule {}
