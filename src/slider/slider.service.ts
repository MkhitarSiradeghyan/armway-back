import { Injectable } from '@nestjs/common';
import { Slider } from '../typeorm/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SliderTranslation } from 'src/typeorm';

@Injectable()
export class SliderService {
    constructor (
        @InjectRepository(Slider)
        private readonly sliderRepository: Repository<Slider>,
    ) {}

    async findAll () {
        try {
            const sliders = this.sliderRepository.find({ relations: ['translations'] });
            return sliders;
        } catch (err) {
            throw err;
        }
    }
    
    async create (titles: any, image: string) {
        try {
            const slider = new Slider();
            slider.url = image;
            const {id} = await slider.save();

            const found = await this.sliderRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!found)
                throw new Error('slider not found');
            else {
                for (const key in titles) {
                    let newOne = new SliderTranslation();
                    newOne.language = +key;
                    newOne.title = titles[key];
                    const translation = await newOne.save()
                    found.translations.push(translation);
                }
                await found.save();
            }
        } catch (err) {
            throw err;
        }
    }


    async delete (id: number) {
        try {
            const slider = await this.sliderRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!slider)
                throw new Error('slider not found');
            else {
                await slider.remove();
            }
        } catch (err) {
            throw err;
        }
    }
}