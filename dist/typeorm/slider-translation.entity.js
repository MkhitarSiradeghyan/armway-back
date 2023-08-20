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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderTranslation = void 0;
const typeorm_1 = require("typeorm");
const lang_enum_1 = require("./lang.enum");
const slider_entity_1 = require("./slider.entity");
let SliderTranslation = exports.SliderTranslation = class SliderTranslation extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SliderTranslation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: lang_enum_1.Langauge,
    }),
    __metadata("design:type", Number)
], SliderTranslation.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SliderTranslation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => slider_entity_1.Slider, (slider) => slider.translations, { cascade: true, onDelete: "CASCADE" }),
    __metadata("design:type", slider_entity_1.Slider)
], SliderTranslation.prototype, "slider", void 0);
exports.SliderTranslation = SliderTranslation = __decorate([
    (0, typeorm_1.Entity)()
], SliderTranslation);
//# sourceMappingURL=slider-translation.entity.js.map