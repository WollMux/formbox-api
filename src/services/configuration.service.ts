import * as consign from 'consign';
import { Injectable } from 'injection-js';

@Injectable()
export class ConfigurationService {
  private config: any = {};

  constructor() {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  getFragment(name: string): string {
    return `assets/${this.config.fragments[ name ]}`;
  }
}
