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
exports.GalleryTranslation = void 0;
const typeorm_1 = require("typeorm");
const lang_enum_1 = require("./lang.enum");
const gallery_entity_1 = require("./gallery.entity");
let GalleryTranslation = exports.GalleryTranslation = class GalleryTranslation extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GalleryTranslation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: lang_enum_1.Langauge,
    }),
    __metadata("design:type", Number)
], GalleryTranslation.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GalleryTranslation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gallery_entity_1.Gallery, (gallery) => gallery.translations, { cascade: true, onDelete: "CASCADE" }),
    __metadata("design:type", gallery_entity_1.Gallery)
], GalleryTranslation.prototype, "gallery", void 0);
exports.GalleryTranslation = GalleryTranslation = __decorate([
    (0, typeorm_1.Entity)()
], GalleryTranslation);
//# sourceMappingURL=gallery-translation.entity.js.map