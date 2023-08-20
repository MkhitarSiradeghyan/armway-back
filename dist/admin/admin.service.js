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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("../typeorm/admin.entity");
let AdminService = exports.AdminService = class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
        this.createIfNotExist(process.env.DEFAULT_ADMIN, process.env.DEFAULT_ADMIN_LOGIN, process.env.DEFAULT_ADMIN_PWD);
    }
    async findOne(login) {
        try {
            const admin = await this.adminRepository.findOne({ where: { login } });
            return admin;
        }
        catch (err) {
            throw err;
        }
    }
    async changePassword(login, password) {
        try {
            const admin = await this.adminRepository.findOne({ where: { login } });
            if (admin) {
                const hash = await bcrypt.hash(password, 10);
                admin.password = hash;
                await this.adminRepository.save(admin);
                return admin;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async comparePassword(password, hash) {
        try {
            return (await bcrypt.compare(password, hash));
        }
        catch (err) {
            throw err;
        }
    }
    async createIfNotExist(name, login, password) {
        try {
            const found = await this.findOne(login);
            if (!found) {
                const hash = await bcrypt.hash(password, 10);
                const admin = await this.adminRepository.save({ name, login, password: hash });
                return admin;
            }
        }
        catch (err) {
            throw err;
        }
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map