import { BaseEntity } from "typeorm";
import { TourTranslation } from "./tour-translation.entity";
export declare class Tour extends BaseEntity {
    id: number;
    urls: string[];
    slug: string;
    price: string;
    date: string;
    translations: TourTranslation[];
}
