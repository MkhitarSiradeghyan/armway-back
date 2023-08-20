import { GalleryService } from './gallery.service';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    findAll(): Promise<{
        error: any;
        body: import("../typeorm").Gallery[];
    } | {
        error: any;
        body: any;
    }>;
    checkBody(body: any): boolean;
    create(body: any, file: any): Promise<{
        error: any;
        body: any;
    }>;
    delete(params: any): Promise<{
        error: any;
        body: any;
    }>;
}
