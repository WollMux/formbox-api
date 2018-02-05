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
      return this.common.getAssetsFolder().then(assetsFolderPath => {
        return this.common.encodeFileToBase64(`${assetsFolderPath}/${this.config.fragments[ name ]}`).then(base64String => {
          return base64String;
        });
      });
    }

    return undefined;
  }

  async getFragmentFilePath(name: string): Promise<string> {
    if (this.config.fragments[ name ]) {
      return this.common.getAssetsFolder().then(assetsFolderPath => {
        return `${assetsFolderPath}/${this.config.fragments[ name ]}`;
      });
    }
  }

  async getTemplateFilePath(name: string): Promise<string> {
    if (this.config.templates[ name ]) {
      return this.common.getAssetsFolder().then(assetsFolderPath => {
        return `${assetsFolderPath}/${this.config.templates[ name ]}`;
      });
    }
  }

  async getTemplate(name: string): Promise<string> {
    if (this.config.templates[ name ]) {
      return this.common.getAssetsFolder().then(assetsFolderPath => {
        return this.common.encodeFileToBase64(`${assetsFolderPath}/${this.config.templates[ name ]}`).then(base64String => {
          return base64String;
        });
      });
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
