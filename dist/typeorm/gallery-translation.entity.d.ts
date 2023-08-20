import { BaseEntity } from "typeorm";
import { Langauge as Lang } from "./lang.enum";
import { Gallery } from "./gallery.entity";
export declare class GalleryTranslation extends BaseEntity {
    id: number;
    language: Lang | null;
    title: string;
    gallery: Gallery;
}
