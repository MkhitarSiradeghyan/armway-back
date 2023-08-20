"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const admin_module_1 = require("./admin/admin.module");
const typeorm_1 = require("@nestjs/typeorm");
const tour_module_1 = require("./tour/tour.module");
const upload_service_1 = require("./upload/upload.service");
const slider_module_1 = require("./slider/slider.module");
const gallery_module_1 = require("./gallery/gallery.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const typeorm_2 = require("./typeorm");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            tour_module_1.TourModule,
            admin_module_1.AdminModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: +process.env.DB_PORT,
                    username: process.env.DB_USER,
                    password: process.env.DB_PWD,
                    database: process.env.DB_NAME,
                    entities: typeorm_2.default,
                    synchronize: true,
                }),
            }),
            slider_module_1.SliderModule,
            gallery_module_1.GalleryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, upload_service_1.UploadService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map