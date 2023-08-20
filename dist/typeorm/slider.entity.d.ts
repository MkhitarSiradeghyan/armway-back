import { BaseEntity } from "typeorm";
import { SliderTranslation } from "./slider-translation.entity";
export declare class Slider extends BaseEntity {
    id: number;
    url: string;
    translations: SliderTranslation[];
}
