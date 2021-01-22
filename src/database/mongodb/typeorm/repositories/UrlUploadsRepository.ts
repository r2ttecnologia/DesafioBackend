import { MongoRepository, getMongoRepository } from 'typeorm';

import IUrlUploads from '../../../repositories/IUrlUploads';

import UrlUploads from '../schemas/UrlUploads';

class UrlUploadsRepository implements IUrlUploads {
  private ormRepository: MongoRepository<UrlUploads>;

  constructor() {
    this.ormRepository = getMongoRepository(UrlUploads, 'mongo');
  }

  public async create(url: string): Promise<UrlUploads> {
    const urlUploads = this.ormRepository.create({
      url,
    });

    await this.ormRepository.save(urlUploads);

    return urlUploads;
  }
}

export default UrlUploadsRepository;
