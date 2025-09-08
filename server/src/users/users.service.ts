import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import * as path from 'path';

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  mgid: string;
  phone?: string;
  birthdate?: string; // ISO YYYY-MM-DD
  documentId?: string;
  passwordHash?: string;
}

@Injectable()
export class UsersService {
  private readonly dataFile: string;

  constructor(private readonly config: ConfigService) {
    // Guardar datos en carpeta "data" relativa al proyecto, válida en dev y prod
    const dataDir = path.join(process.cwd(), 'data');
    this.dataFile = path.join(dataDir, 'users.json');
  }

  private async ensureFile() {
    try {
      await fs.access(this.dataFile);
    } catch {
      const seed: UserProfile = {
        id: 1,
        email: this.config.get('ADMIN_EMAIL') || 'admin@migusto.com',
        name: 'Administrador',
        mgid: 'MG-6RJXFY',
        passwordHash: this.config.get('ADMIN_PASSWORD_HASH') || '',
      };
      await fs.mkdir(path.dirname(this.dataFile), { recursive: true });
      await fs.writeFile(this.dataFile, JSON.stringify(seed, null, 2));
    }
  }

  private async readAll(): Promise<UserProfile[]> {
    await this.ensureFile();
    try {
      const raw = await fs.readFile(this.dataFile, 'utf-8');
      const data = JSON.parse(raw);
      // Soportar formato antiguo (objeto único)
      if (Array.isArray(data)) return data as UserProfile[];
      return [data as UserProfile];
    } catch {
      return [];
    }
  }

  private async writeAll(users: UserProfile[]): Promise<void> {
    await fs.writeFile(this.dataFile, JSON.stringify(users, null, 2));
  }

  public async getMe(): Promise<UserProfile> {
    const users = await this.readAll();
    // Por ahora devolvemos el primero (usuario único)
    return users[0];
  }

  public async updateMe(partial: Partial<UserProfile>): Promise<UserProfile> {
    const users = await this.readAll();
    const current = users[0];
    const updated: UserProfile = { ...current, ...partial };
    users[0] = updated;
    await this.writeAll(users);
    return updated;
  }

  public async registerUser(email: string, name: string, passwordHash: string): Promise<UserProfile> {
    const users = await this.readAll();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('El email ya está registrado');
    }
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const mgid = `MG-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const user: UserProfile = { id, email, name, mgid, passwordHash };
    users.push(user);
    await this.writeAll(users);
    return user;
  }

  public async getById(id: number): Promise<UserProfile | undefined> {
    const users = await this.readAll();
    return users.find(u => u.id === id);
  }

  public async updateById(id: number, partial: Partial<UserProfile>): Promise<UserProfile> {
    const users = await this.readAll();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
      throw new Error('Usuario no encontrado');
    }
    users[idx] = { ...users[idx], ...partial };
    await this.writeAll(users);
    return users[idx];
  }

  public async findByEmail(email: string): Promise<UserProfile | undefined> {
    const users = await this.readAll();
    return users.find(u => u.email?.toLowerCase() === email.toLowerCase());
  }
}


