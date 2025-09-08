import { Body, Controller, Get, Put, UseGuards, Req } from '@nestjs/common';
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
  async getMe(@Req() req: any): Promise<UserProfile> {
    const userId = Number(req.user?.id || req.user?.sub);
    if (userId) {
      const me = await this.users.getById(userId);
      if (me) return me;
    }
    return this.users.getMe();
  }

  @Put('me')
  async updateMe(@Req() req: any, @Body() dto: UpdateMeDto): Promise<UserProfile> {
    const userId = Number(req.user?.id || req.user?.sub);
    if (userId) return this.users.updateById(userId, dto);
    return this.users.updateMe(dto);
  }
}


