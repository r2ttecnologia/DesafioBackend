import path from 'path';
import fs from 'fs';

import IStorageProvider from '../models/IStorageProvider';

import uploadConfig from '../../config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.readFile(
      path.resolve(uploadConfig.tmpFolder, file));

    return file;
  }
}

export default DiskStorageProvider;
