import { Injectable } from '@nestjs/common';
import { Tour, TourTranslation } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class TourService {
    constructor (
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,
    ) {}

    async findOne (id: number) {
        try {
            const tour = await this.tourRepository.findOne({ where : { id }, relations: ['translations'] });
            return tour;
        } catch (err) {
            throw err;
        }
    }
    
    async findOneBySlug (slug: string) {
        try {
            const tour = await this.tourRepository.findOne({ where : { slug }, relations: ['translations'] });
            return tour;
        } catch (err) {
            throw err;
        }
    }

    async findAll () {
        try {
            const tours = await this.tourRepository.find({ relations: ['translations'] });
            return tours;
        } catch (err) {
            throw err;
        }
    }

    async create (data) {
        try {
            const tour = new Tour();
            tour.urls = data.images;
            tour.slug = data.slug;
            const newtour = await tour.save();
            const found = await this.tourRepository.findOne(
                { where : { id: newtour.id }, 
                relations: ['translations'] }
            );
            const titles = data.titles;
            const descriptions = data.descriptions;
            if (!found)
                throw new Error('slider not found');
            else {
                for (const key in titles) {
                    let newOne = new TourTranslation();
                    newOne.language = +key;
                    newOne.title = titles[key];
                    newOne.description = descriptions[key];
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
            const tour = await this.tourRepository.findOne({  where : { id } });
            await tour.remove();
        } catch (err) {
            throw err;
        }
    }
}
