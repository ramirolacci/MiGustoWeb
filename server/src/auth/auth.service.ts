import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

interface UserRecord {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

@Injectable()
export class AuthService {
  private readonly adminUser: UserRecord;

  constructor(private readonly jwt: JwtService, private readonly config: ConfigService) {
    const defaultEmail = this.config.get<string>('ADMIN_EMAIL') || 'admin@migusto.com';
    const defaultPasswordHash =
      this.config.get<string>('ADMIN_PASSWORD_HASH') ||
      // Generar hash en runtime para 'admin123' si no se provee uno por entorno
      bcrypt.hashSync('admin123', 10);
    this.adminUser = {
      id: 1,
      email: defaultEmail,
      name: 'Administrador',
      passwordHash: defaultPasswordHash,
    };
  }

  public async validateUser(email: string, password: string) {
    const user = email.toLowerCase() === this.adminUser.email.toLowerCase() ? this.adminUser : null;
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return { id: user.id, email: user.email, name: user.name };
  }

  public async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken, user };
  }

  public async getProfileFromPayload(payload: { sub: number; email: string; name: string }) {
    return { id: payload.sub, email: payload.email, name: payload.name };
  }
}


