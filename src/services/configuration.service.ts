import * as consign from 'consign';
import { Injectable } from 'injection-js';
import * as fs from 'fs';
import * as base64 from 'base64-async';

@Injectable()
export class ConfigurationService {
  private config: any = {};

  constructor() {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  async getFragment(name: string): Promise<string> {
    var filePath = `assets/${this.config.fragments[ name ]}`;

    return this.encodeFileToBase64(filePath);
  }

  async encodeFileToBase64(filePath: string): Promise<string> {
    return base64.encode(fs.readFileSync(filePath));
  }
}
