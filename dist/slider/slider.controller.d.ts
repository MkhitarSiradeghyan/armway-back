import { SliderService } from './slider.service';
export declare class SliderController {
    private readonly sliderService;
    constructor(sliderService: SliderService);
    checkBody(body: any): boolean;
    findAll(): Promise<{
        error: any;
        body: import("../typeorm").Slider[];
    } | {
        error: any;
        body: any;
    }>;
    create(body: any, file: any): Promise<{
        error: any;
        body: any;
    }>;
    delete(params: any): Promise<{
        error: any;
        body: any;
    }>;
}
