import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { SliderTranslation } from "./slider-translation.entity";

@Entity()
export class Slider extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', default: '' })
    url: string;
 
    @OneToMany(() => SliderTranslation, (translation) => translation.slider)
    translations: SliderTranslation[];
}