import { Injectable } from 'injection-js';

@Injectable()
export class CommonService {

  async getAssetsFolder(): Promise<string> {
    return process.env.ASSETS;
  }
}