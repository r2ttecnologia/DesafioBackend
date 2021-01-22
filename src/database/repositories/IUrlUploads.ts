import UrlUploads from '../mongodb/typeorm/schemas/UrlUploads';

export default interface IUrlUploads {
  create(url: string): Promise<UrlUploads>;
}
