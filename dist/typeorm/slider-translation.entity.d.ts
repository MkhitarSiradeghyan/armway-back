import { BaseEntity } from "typeorm";
import { Langauge as Lang } from "./lang.enum";
import { Slider } from "./slider.entity";
export declare class SliderTranslation extends BaseEntity {
    id: number;
    language: Lang | null;
    title: string;
    slider: Slider;
}
