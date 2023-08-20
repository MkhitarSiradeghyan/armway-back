import { Repository } from 'typeorm';
import { Gallery } from '../typeorm/gallery.entity';
export declare class GalleryService {
    private readonly galleryRepository;
    constructor(galleryRepository: Repository<Gallery>);
    findAll(): Promise<Gallery[]>;
    create(isVideo: any, titles: any, url: any): Promise<void>;
    delete(id: number): Promise<void>;
}
