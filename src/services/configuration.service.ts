import * as consign from 'consign';
import { Injectable } from 'injection-js';
import { CommonService } from '../services/common.service';

@Injectable()
export class ConfigurationService {
  private config: any = {};

  constructor(private common: CommonService) {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  getFragments(): any {
    return this.config.fragments;
  }

  getTemplates(): any {
    return this.config.templates;
  }

  getFragmentFilePath(name: string): string {
    return `${this.config.fragments[name]}`;
  }

  getTemplateFilePath(name: string): string {
    return `${this.config.templates[name]}`;
  }

  getLDAP(name: string): any {
    return this.config.ldap[name];
  }
}
