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
exports.TourService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("../typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
let TourService = exports.TourService = class TourService {
    constructor(tourRepository) {
        this.tourRepository = tourRepository;
    }
    async findOne(id) {
        try {
            const tour = await this.tourRepository.findOne({ where: { id }, relations: ['translations'] });
            return tour;
        }
        catch (err) {
            throw err;
        }
    }
    async findOneBySlug(slug) {
        try {
            const tour = await this.tourRepository.findOne({ where: { slug }, relations: ['translations'] });
            return tour;
        }
        catch (err) {
            throw err;
        }
    }
    async findAll() {
        try {
            const tours = await this.tourRepository.find({ relations: ['translations'] });
            return tours;
        }
        catch (err) {
            throw err;
        }
    }
    async create(data) {
        try {
            const tour = new typeorm_1.Tour();
            tour.urls = data.images;
            tour.slug = data.slug;
            tour.date = data.date;
            tour.price = data.price;
            const newtour = await tour.save();
            const found = await this.tourRepository.findOne({ where: { id: newtour.id },
                relations: ['translations'] });
            const titles = data.titles;
            const descriptions = data.descriptions;
            if (!found)
                throw new Error('slider not found');
            else {
                for (const key in titles) {
                    let newOne = new typeorm_1.TourTranslation();
                    newOne.language = +key;
                    newOne.title = titles[key];
                    newOne.description = descriptions[key];
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
            const tour = await this.tourRepository.findOne({ where: { id } });
            await tour.remove();
        }
        catch (err) {
            throw err;
        }
    }
};
exports.TourService = TourService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(typeorm_1.Tour)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], TourService);
//# sourceMappingURL=tour.service.js.map