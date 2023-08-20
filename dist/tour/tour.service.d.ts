import { Tour } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class TourService {
    private readonly tourRepository;
    constructor(tourRepository: Repository<Tour>);
    findOne(id: number): Promise<Tour>;
    findOneBySlug(slug: string): Promise<Tour>;
    findAll(): Promise<Tour[]>;
    create(data: any): Promise<void>;
    delete(id: number): Promise<void>;
}
