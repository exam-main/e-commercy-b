import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailService } from 'src/email/email.service';

import { JwtStrategy } from 'src/Common/JwtAuthGuard/jwt.strategy';
import { JwtAuthGuard } from 'src/Common/JwtAuthGuard/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard], // ❗ Boshqa modullarda ishlatish uchun
})
export class AuthModule {}
