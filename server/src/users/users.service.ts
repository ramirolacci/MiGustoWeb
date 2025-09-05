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
      };
      await fs.mkdir(path.dirname(this.dataFile), { recursive: true });
      await fs.writeFile(this.dataFile, JSON.stringify(seed, null, 2));
    }
  }

  public async getMe(): Promise<UserProfile> {
    await this.ensureFile();
    const raw = await fs.readFile(this.dataFile, 'utf-8');
    return JSON.parse(raw) as UserProfile;
  }

  public async updateMe(partial: Partial<UserProfile>): Promise<UserProfile> {
    const current = await this.getMe();
    const updated: UserProfile = { ...current, ...partial };
    await fs.writeFile(this.dataFile, JSON.stringify(updated, null, 2));
    return updated;
  }
}


