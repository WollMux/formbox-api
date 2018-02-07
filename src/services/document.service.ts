import * as consign from 'consign';
import { Injectable } from 'injection-js';
import { CommonService } from '../services/common.service';

@Injectable()
export class DocumentService {
    private config: any = {};

    constructor(private common: CommonService) {
        consign({ cwd: process.env.CONFIG }).include('.').into(this.config);
    }

    async getFragment(name: string): Promise<string> {
        return this.common.getAssetsFolder().then(assetsFolderPath => {
            return this.common.encodeFileToBase64(`${assetsFolderPath}/${this.config.fragments[name]}`).then(base64String => {
                return base64String;
            });
        });
    }

    async getTemplate(name: string): Promise<string> {
        return this.common.getAssetsFolder().then(assetsFolderPath => {
            return this.common.encodeFileToBase64(`${assetsFolderPath}/${this.config.templates[name]}`).then(base64String => {
                return base64String;
            });
        });
    }

    async getFragmentFilePath(name: string): Promise<string> {
        return `${this.config.fragments[name]}`;
    }

    async getTemplateFilePath(name: string): Promise<string> {
        return `${this.config.templates[name]}`;
    }
}
