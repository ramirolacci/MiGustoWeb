import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

interface UserRecord {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

@Injectable()
export class AuthService {
  private readonly adminUser: UserRecord;

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly users: UsersService,
  ) {
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
    // Intentar contra adminUser primero
    let user = null as null | { id: number; email: string; name: string };
    try {
      user = await this.validateUser(email, password);
    } catch {
      // Si no coincide con admin, buscar en users.json
      const candidate = await this.users.findByEmail(email);
      if (!candidate || !candidate.passwordHash) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const ok = await bcrypt.compare(password, candidate.passwordHash);
      if (!ok) throw new UnauthorizedException('Credenciales inválidas');
      user = { id: candidate.id, email: candidate.email, name: candidate.name };
    }
    const payload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken, user };
  }

  public async getProfileFromPayload(payload: { sub: number; email: string; name: string }) {
    return { id: payload.sub, email: payload.email, name: payload.name };
  }

  public async register(email: string, password: string, name?: string) {
    if (!email || !password) throw new BadRequestException('Email y contraseña requeridos');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.registerUser(email.toLowerCase(), name?.trim() || 'Usuario', passwordHash);
    const payload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken, user };
  }
}


