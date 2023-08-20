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
exports.TourTranslation = void 0;
const typeorm_1 = require("typeorm");
const tour_entity_1 = require("./tour.entity");
const lang_enum_1 = require("./lang.enum");
let TourTranslation = exports.TourTranslation = class TourTranslation extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TourTranslation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: lang_enum_1.Langauge,
    }),
    __metadata("design:type", Number)
], TourTranslation.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], TourTranslation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], TourTranslation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tour_entity_1.Tour, tour => tour.translations, { cascade: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'tour_id' }),
    __metadata("design:type", tour_entity_1.Tour)
], TourTranslation.prototype, "tour", void 0);
exports.TourTranslation = TourTranslation = __decorate([
    (0, typeorm_1.Entity)()
], TourTranslation);
//# sourceMappingURL=tour-translation.entity.js.map