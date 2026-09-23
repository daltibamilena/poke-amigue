import { Injectable } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class AssetsService {
  private readonly basePath: string;

  constructor() {
    const appRoot = path.resolve(__dirname, '..', '..');
    this.basePath = process.env.ASSETS_PATH ?? appRoot;
  }

  resolve(filename: string): string {
    return path.resolve(this.basePath, filename);
  }

  async readJson<T>(filename: string): Promise<T> {
    const filePath = this.resolve(filename);
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  }

  async listDirectory(directory: string): Promise<string[]> {
    const fullPath = this.resolve(directory);
    return fs.readdir(fullPath);
  }
}
