import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService, UserProfile } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { IsOptional, IsString } from 'class-validator';

class UpdateMeDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() birthdate?: string;
  @IsOptional() @IsString() documentId?: string;
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  async getMe(): Promise<UserProfile> {
    return this.users.getMe();
  }

  @Put('me')
  async updateMe(@Body() dto: UpdateMeDto): Promise<UserProfile> {
    return this.users.updateMe(dto);
  }
}


