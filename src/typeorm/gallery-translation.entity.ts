import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { Langauge as Lang } from "./lang.enum";
import { Gallery } from "./gallery.entity";

@Entity()
export class GalleryTranslation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: Lang,
    })
    language: Lang | null;

    @Column()
    title: string;

    @ManyToOne(() => Gallery, (gallery) => gallery.translations, { cascade: true, onDelete: "CASCADE" })
    gallery: Gallery;
}