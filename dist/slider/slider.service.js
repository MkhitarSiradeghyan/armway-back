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
exports.SliderService = void 0;
const common_1 = require("@nestjs/common");
const slider_entity_1 = require("../typeorm/slider.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("../typeorm");
let SliderService = exports.SliderService = class SliderService {
    constructor(sliderRepository) {
        this.sliderRepository = sliderRepository;
    }
    async findAll() {
        try {
            const sliders = this.sliderRepository.find({ relations: ['translations'] });
            return sliders;
        }
        catch (err) {
            throw err;
        }
    }
    async create(titles, image) {
        try {
            const slider = new slider_entity_1.Slider();
            slider.url = image;
            const { id } = await slider.save();
            const found = await this.sliderRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!found)
                throw new Error('slider not found');
            else {
                for (const key in titles) {
                    let newOne = new typeorm_3.SliderTranslation();
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
            const slider = await this.sliderRepository.findOne({ where: { id }, relations: ['translations'] });
            if (!slider)
                throw new Error('slider not found');
            else {
                await slider.remove();
            }
        }
        catch (err) {
            throw err;
        }
    }
};
exports.SliderService = SliderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(slider_entity_1.Slider)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SliderService);
//# sourceMappingURL=slider.service.js.map