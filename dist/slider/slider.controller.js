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
exports.SliderController = void 0;
const common_1 = require("@nestjs/common");
const lang_enum_1 = require("../typeorm/lang.enum");
const slider_service_1 = require("./slider.service");
const admin_guard_1 = require("../admin/admin.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../configs/multer.config");
let SliderController = exports.SliderController = class SliderController {
    constructor(sliderService) {
        this.sliderService = sliderService;
    }
    checkBody(body) {
        if (body.title_am === undefined)
            return false;
        if (body.title_en === undefined)
            return false;
        if (body.title_ru === undefined)
            return false;
        return true;
    }
    async findAll() {
        try {
            const sliders = await this.sliderService.findAll();
            return { error: null, body: sliders };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    async create(body, file) {
        try {
            if (this.checkBody(body) === false)
                throw new Error('some fields are missing');
            const image = await file.filename;
            const titles = [];
            titles[lang_enum_1.Langauge.AM] = body.title_am;
            titles[lang_enum_1.Langauge.RU] = body.title_ru;
            titles[lang_enum_1.Langauge.EN] = body.title_en;
            await this.sliderService.create(titles, image);
            return { error: null, body: null };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    async delete(params) {
        try {
            const id = params.id;
            if (id === undefined)
                throw new Error('id is undefined');
            await this.sliderService.delete(id);
            return { error: null, body: null };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.multerConfig)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "delete", null);
exports.SliderController = SliderController = __decorate([
    (0, common_1.Controller)('slider'),
    __metadata("design:paramtypes", [slider_service_1.SliderService])
], SliderController);
//# sourceMappingURL=slider.controller.js.map