import * as consign from 'consign';
import { Injectable } from 'injection-js';
import { CommonService } from '../services/common.service';

@Injectable()
export class DocumentService {
  private config: any = {};

  constructor(private common: CommonService) {
    consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
  }

  getFragmentFilePath(name: string): string {
    return `${this.config.fragments[name]}`;
  }

  getTemplateFilePath(name: string): string {
    return `${this.config.templates[name]}`;
  }
}
