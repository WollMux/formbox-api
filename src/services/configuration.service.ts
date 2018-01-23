import * as consign from 'consign';
import { Injectable } from 'injection-js';
import { CommonService } from '../services/common.service';

@Injectable()
export class ConfigurationService {
  private config: any = {};

  constructor(private common: CommonService) {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  async getFragment(name: string): Promise<string> {
    if (this.config.fragments[ name ]) {
      return this.common.encodeFileToBase64(`assets/${this.config.fragments[ name ]}`);
    }

    return undefined;
  }

  async getTemplate(name: string): Promise<string> {
    if (this.config.templates[ name ]) {
      return this.common.encodeFileToBase64(`${this.common.getAssetsFolder()}/${this.config.templates[ name ]}`);
    }

    return undefined;
  }

  async getFragments(): Promise<any> {
    return this.config.fragments;
  }

  async getTemplates(): Promise<any> {
    return this.config.templates;
  }
}
