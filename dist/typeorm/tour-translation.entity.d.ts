import { BaseEntity } from 'typeorm';
import { Tour } from './tour.entity';
import { Langauge as Lang } from './lang.enum';
export declare class TourTranslation extends BaseEntity {
    id: number;
    language: Lang | null;
    title: string;
    description: string;
    tour: Tour;
}
