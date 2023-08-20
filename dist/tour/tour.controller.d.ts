import { TourService } from './tour.service';
import { UploadService } from '../upload/upload.service';
import { Tour } from 'src/typeorm';
export declare class TourController {
    private readonly tourService;
    private readonly uploadService;
    private transporter;
    constructor(tourService: TourService, uploadService: UploadService);
    checkBody(body: any): boolean;
    checkBodyRegister(body: any): boolean;
    buildContent(body: any, tour: Tour): string;
    register(body: any): Promise<{
        error: any;
        body: any;
    }>;
    private imagesPath;
    create(body: any, files: any): Promise<{
        error: any;
        body: void;
    } | {
        error: any;
        body: any;
    }>;
    delete(params: any): Promise<{
        error: any;
        body: void;
    } | {
        error: any;
        body: any;
    }>;
    getAll(): Promise<{
        error: any;
        body: Tour[];
    } | {
        error: any;
        body: any;
    }>;
    get(params: any): Promise<{
        error: any;
        body: Tour;
    } | {
        error: any;
        body: any;
    }>;
}
