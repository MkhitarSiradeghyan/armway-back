import { BaseEntity } from "typeorm";
import { GalleryTranslation } from "./gallery-translation.entity";
export declare class Gallery extends BaseEntity {
    id: number;
    url: string;
    isVideo: boolean;
    translations: GalleryTranslation[];
}
