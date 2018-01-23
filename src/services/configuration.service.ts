import * as consign from 'consign';
import { Injectable } from 'injection-js';
import * as fs from 'fs';
import * as base64 from 'base64-async';
import { CommonService } from '../services/common.service';


@Injectable()
export class ConfigurationService {
  private config: any = {};

  constructor(private common: CommonService) {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  async getFragment(name: string): Promise<string> {
    const filePath = `assets/${this.config.fragments[ name ]}`;

    return this.encodeFileToBase64(filePath);
  }

  async getTemplate(name: string): Promise<string> {
    if(this.config.templates[name]) {
      return `${this.common.getAssetsFolder()}/${this.config.templates[name]}`; 
    }

    return undefined;
  }

  async getFragmentList(): Promise<any> {
    return this.config.fragments;
  }

  async getTemplates(): Promise<any> {
    return this.config.templates;
  }

  async encodeFileToBase64(filePath: string): Promise<string> {
    return base64.encode(fs.readFileSync(filePath));
  }
}
