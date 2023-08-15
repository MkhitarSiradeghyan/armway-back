import { 
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany
} from "typeorm";
import { TourTranslation } from "./tour-translation.entity";

@Entity()
export class Tour extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', array: true, default: [] })
    urls: string[];

    @Column({default: ''})
    slug: string;

    @Column({default: ''})
    price: string;
    
    @Column({ type: 'text', default: '10.10.2023' })
    date: string;

    @OneToMany(() => TourTranslation, (translation) => translation.tour)
    translations: TourTranslation[];
}