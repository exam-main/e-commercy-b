import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SendCodeDto } from './dto/SendCodeDto';
import { JwtAuthGuard } from 'src/Common/JwtAuthGuard/jwt-auth.guard';  

class RegisterDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}

class LoginDto {
  email: string;
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('send-code')
  @ApiOperation({ summary: 'Send verification code to email' })
  sendVerificationCode(@Body() dto: SendCodeDto) {
    return this.authService.sendVerificationCode(dto.email);
  }

  // Himoyalangan endpoint — faqat token bilan kirish mumkin
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get logged in user profile' })
  getProfile(@Request() req) {
    return req.user;
  }
}
