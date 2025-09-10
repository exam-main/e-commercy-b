import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import * as nodemailer from 'nodemailer';
import { Role } from 'src/Common/Enums/role.enum';
import { MailService } from 'src/email/email.service';

@Injectable()
export class AuthService {


  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerservice:MailService
  ) {
    
  }

  async register(userData: { firstname: string; lastname: string; email: string; password: string; role: string; phone?: string }) {
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email allaqachon ro‘yxatdan o‘tgan');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const roleEnumValue = Role[userData.role.toUpperCase() as keyof typeof Role];
    if (!roleEnumValue) {
      throw new UnauthorizedException('Invalid role provided');
    }
    const user = await this.userService.createUser({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      password: hashedPassword,
      role: roleEnumValue,
      phone: userData.phone ?? '',
    });
    try {
      await this.sendEmail(user.email, 'Welcome!', "Siz muvaffaqiyatli ro'yxatdan o'tdingiz!");
    } catch (error) {
      console.error('Email yuborishda xatolik:', error);
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      to,
      subject,
      text,
    };
    await this.mailerservice.verification(to,subject,1222);

    return { message:"Confirm code send"}
  }

  async sendVerificationCode(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await this.sendEmail(email, 'Verification Code', `Sizning tasdiqlash kodingiz: ${code}`);
    return { message: 'Verification code sent to email' };
  }
}
