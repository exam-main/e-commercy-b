import { Role } from '@prisma/client';

export class CreateUserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
}
