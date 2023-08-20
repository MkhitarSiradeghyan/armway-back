"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gallery_translation_entity_1 = require("../typeorm/gallery-translation.entity");
const gallery_entity_1 = require("../typeorm/gallery.entity");
let GalleryService = exports.GalleryService = class GalleryService {
    constructor(galleryRepository) {
        this.galleryRepository = galleryRepository;
    }
    async findAll() {
        try {
            const galleries = await this.galleryRepository.find({ relations: ['translations'] });
            return galleries;
        }
        catch (err) {
            throw err;
        }
    }
    async create(isVideo, titles, url) {
        try {
            const gallery = new gallery_entity_1.Gallery();
            gallery.url = url;
            gallery.isVideo = isVideo;
            const { id } = await gallery.save();
            const found = await this.galleryRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!found)
                throw new Error('gallery not found');
            else {
                for (const key in titles) {
                    let newOne = new gallery_translation_entity_1.GalleryTranslation();
                    newOne.language = +key;
                    newOne.title = titles[key];
                    const translation = await newOne.save();
                    found.translations.push(translation);
                }
                await found.save();
            }
        }
        catch (err) {
            throw err;
        }
    }
    async delete(id) {
        try {
            const gallery = await this.galleryRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!gallery)
                throw new Error('gallery not found');
            else {
                await gallery.remove();
            }
        }
        catch (err) {
            throw err;
        }
    }
};
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gallery_entity_1.Gallery)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map