import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";

import { GalleryTranslation } from "./gallery-translation.entity";

@Entity()
export class Gallery extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'text', default: '' })
    url: string;

    @Column({ type: 'bool', default: false })
    isVideo: boolean;
    
    @OneToMany(() => GalleryTranslation, (translation) => translation.gallery)
    translations: GalleryTranslation[];
}