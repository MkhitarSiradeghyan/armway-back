import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany
 } from 'typeorm';

import { Tour } from './tour.entity';
import { Langauge as Lang } from './lang.enum';

@Entity()
export class TourTranslation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: Lang,
    })
    language: Lang | null;

    @Column({default: ''})
    title: string;

    @Column({default: ''})
    description: string;

    @ManyToOne(() => Tour, tour => tour.translations, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'tour_id' })
    tour: Tour;
}