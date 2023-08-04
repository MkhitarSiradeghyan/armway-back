import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryTranslation } from '../typeorm/gallery-translation.entity';
import { Gallery } from '../typeorm/gallery.entity';

@Injectable()
export class GalleryService {
    constructor (
        @InjectRepository(Gallery)
        private readonly galleryRepository: Repository<Gallery>,
    ) {}

    async findAll() {
        try {
            const galleries = await this.galleryRepository.find({ relations: ['translations'] });
            return galleries;
        } catch (err) {
            throw err;
        }
    }

    async create(isVideo, titles, url) {
        try {
            const gallery = new Gallery();
            gallery.url = url;
            gallery.isVideo = isVideo;
            const { id } = await gallery.save();

            const found = await this.galleryRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!found)
                throw new Error('gallery not found');
            else {
                for (const key in titles) {
                    let newOne = new GalleryTranslation();
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

    async delete(id: number) {
        try {
            const gallery = await this.galleryRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!gallery)
                throw new Error('gallery not found');
            else {
                await gallery.remove();
            }
        } catch (err) {
            throw err;
        }
    }
}
