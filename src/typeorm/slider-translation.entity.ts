import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { Langauge as Lang } from "./lang.enum";
import { Slider } from "./slider.entity";

@Entity()
export class SliderTranslation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: Lang,
    })
    language: Lang | null;

    @Column()
    title: string;

    @ManyToOne(() => Slider, (slider) => slider.translations, { cascade: true, onDelete: "CASCADE" })
    slider: Slider;
}