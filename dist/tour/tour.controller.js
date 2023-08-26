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
exports.TourController = void 0;
const common_1 = require("@nestjs/common");
const tour_service_1 = require("./tour.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../configs/multer.config");
const upload_service_1 = require("../upload/upload.service");
const slugConvert_1 = require("../utils/slugConvert");
const lang_enum_1 = require("../typeorm/lang.enum");
const admin_guard_1 = require("../admin/admin.guard");
const nodemailer = require("nodemailer");
const path = require("path");
let TourController = exports.TourController = class TourController {
    constructor(tourService, uploadService) {
        this.tourService = tourService;
        this.uploadService = uploadService;
        this.imagesPath = path.join(__dirname, '../..', 'public');
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    checkBody(body) {
        if (body.title_am === undefined)
            return false;
        if (body.title_en === undefined)
            return false;
        if (body.title_ru === undefined)
            return false;
        if (body.description_am === undefined)
            return false;
        if (body.description_en === undefined)
            return false;
        if (body.description_ru === undefined)
            return false;
        if (body.price === undefined)
            return false;
        return true;
    }
    checkBodyRegister(body) {
        if (body.email === undefined)
            return false;
        if (body.name === undefined)
            return false;
        if (body.phone === undefined)
            return false;
        if (body.tour_id === undefined)
            return false;
        return true;
    }
    buildContent(body, tour) {
        let content = '';
        content += `Name: ${body.name}\n`;
        content += `Email: ${body.email}\n`;
        content += `Phone: ${body.phone}\n`;
        content += `Tour: ${tour.translations[0].title} (#${tour.id})\n`;
        content += `Date: ${tour.date}\n`;
        return content;
    }
    async register(body) {
        try {
            console.log(body);
            if (!this.checkBodyRegister(body))
                throw new Error('Not valid information provided');
            const tour = await this.tourService.findOneBySlug(body.tour_id);
            if (tour)
                throw new Error('Not valid information provided');
            const content = this.buildContent(body, tour);
            const response = await this.transporter.sendMail({
                from: `Armway Mailer Agent<${process.env.EMAIL}>`,
                to: process.env.MAIL_TO,
                subject: 'Tour reservation',
                text: content,
            });
            return { error: null, body: null };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    async create(body, files) {
        try {
            if (!this.checkBody(body))
                throw new Error('Not valid information provided');
            const date = body.date;
            const price = body.price;
            const titles = [];
            titles[lang_enum_1.Langauge.AM] = body.title_am;
            titles[lang_enum_1.Langauge.RU] = body.title_ru;
            titles[lang_enum_1.Langauge.EN] = body.title_en;
            const descriptions = [];
            descriptions[lang_enum_1.Langauge.AM] = body.description_am;
            descriptions[lang_enum_1.Langauge.RU] = body.description_ru;
            descriptions[lang_enum_1.Langauge.EN] = body.description_en;
            const uploadedFileNames = await this.uploadService.uploadFiles(files);
            const slug = (0, slugConvert_1.slugConvert)(body.title_am);
            const data = {
                titles,
                descriptions,
                slug,
                images: uploadedFileNames,
                date,
                price
            };
            const tour = await this.tourService.create(data);
            return { error: null, body: tour };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    async delete(params) {
        const id = params.id;
        try {
            if (id === undefined)
                throw new Error('Not valid information provided');
            const tour = await this.tourService.delete(id);
            return { error: null, body: tour };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    async getAll() {
        try {
            const tours = await this.tourService.findAll();
            return { error: null, body: tours };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    async get(params) {
        try {
            const tour = await this.tourService.findOneBySlug(params.slug);
            return { error: null, body: tour };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 50, multer_config_1.multerConfig)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TourController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "get", null);
exports.TourController = TourController = __decorate([
    (0, common_1.Controller)('tour'),
    __metadata("design:paramtypes", [tour_service_1.TourService,
        upload_service_1.UploadService])
], TourController);
//# sourceMappingURL=tour.controller.js.map