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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const admin_service_1 = require("./admin.service");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
const admin_guard_1 = require("./admin.guard");
const getPayload_1 = require("../utils/getPayload");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService, jwtService, cacheM) {
        this.adminService = adminService;
        this.jwtService = jwtService;
        this.cacheM = cacheM;
    }
    async generateToken(admin) {
        try {
            const token = await this.jwtService.sign({
                admin: admin.login,
            }, { secret: process.env.JWT_SECRET });
            return token;
        }
        catch (err) {
            throw err;
        }
    }
    async saveLoggedInAdmin(token) {
        try {
            let saveLoggedInAdmin = await this.cacheM.get('logged_in');
            if (saveLoggedInAdmin === undefined)
                saveLoggedInAdmin = [];
            saveLoggedInAdmin.push(token);
            await this.cacheM.set('logged_in', saveLoggedInAdmin, 0);
        }
        catch (err) {
            throw err;
        }
    }
    async login(body) {
        try {
            const login = body.login;
            const password = body.password;
            if (login === undefined || password === undefined)
                throw new Error('login or password is undefined');
            const admin = await this.adminService.findOne(login);
            if (admin) {
                if (await this.adminService.comparePassword(password, admin.password)) {
                    const token = await this.generateToken(admin);
                    await this.saveLoggedInAdmin(token);
                    return { error: null, body: {
                            token,
                            admin: {
                                name: admin.name,
                                login: admin.login,
                            }
                        }
                    };
                }
                else
                    throw new Error('password is incorrect');
            }
            else {
                throw new Error('login is incorrect');
            }
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    checkChangePasswordBody(body) {
        if (body.login === undefined || body.oldPassword === undefined || body.newPassword === undefined)
            throw new Error('login or oldPassword or newPassword is undefined');
        if (body.oldPassword === body.newPassword)
            throw new Error('oldPassword and newPassword are the same');
    }
    async changePassword(body, headers) {
        try {
            const login = body.login;
            const newPassword = body.newPassword;
            this.checkChangePasswordBody(body);
            this.adminService.changePassword(login, newPassword);
            return { error: null, body: null };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
    async logout(headers) {
        try {
            const token = (0, getPayload_1.getPayload)(headers);
            console.log(token);
            if (token === undefined)
                throw new Error('token is undefined');
            let saveLoggedInAdmin = await this.cacheM.get('logged_in');
            if (saveLoggedInAdmin === undefined)
                saveLoggedInAdmin = [];
            const index = saveLoggedInAdmin.indexOf(token);
            if (index === -1)
                throw new Error('token is not found');
            saveLoggedInAdmin.splice(index, 1);
            await this.cacheM.set('logged_in', saveLoggedInAdmin, 0);
            return { error: null, body: null };
        }
        catch (err) {
            return { error: err.message, body: null };
        }
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_2.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_2.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "logout", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        jwt_1.JwtService, Object])
], AdminController);
//# sourceMappingURL=admin.controller.js.map