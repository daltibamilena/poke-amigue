import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthPayload, LoginUserResponse, RegisterUserResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<RegisterUserResponse> {
    const username = dto.username.trim();

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    });

    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    };
  }

  async login(dto: LoginUserDto): Promise<LoginUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username.trim() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const payload: AuthPayload = {
      sub: user.id,
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async validateUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }
}
