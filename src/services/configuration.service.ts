import * as consign from 'consign';
import { Injectable } from 'injection-js';
import { CommonService } from '../services/common.service';

@Injectable()
export class ConfigurationService {
  private config: any = {};

  constructor(private common: CommonService) {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  async getFragments(): Promise<any> {
    return this.config.fragments;
  }

  async getTemplates(): Promise<any> {
    return this.config.templates;
  }

  getLDAP(name: string): any {
    return this.config.ldap[ name ];
  }
}
