import { Slider } from '../typeorm/slider.entity';
import { Repository } from 'typeorm';
export declare class SliderService {
    private readonly sliderRepository;
    constructor(sliderRepository: Repository<Slider>);
    findAll(): Promise<Slider[]>;
    create(titles: any, image: string): Promise<void>;
    delete(id: number): Promise<void>;
}
