import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { Admin } from '../typeorm/admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) {
        this.createIfNotExist(process.env.DEFAULT_ADMIN, process.env.DEFAULT_ADMIN_LOGIN, process.env.DEFAULT_ADMIN_PWD);
    }

    async findOne(login: string): Promise<Admin | undefined> {
        try {
            const admin: Admin = await this.adminRepository.findOne({ where : { login } });
            return admin;
        } catch (err) {
            throw err;
        }
    }

    async changePassword(login: string, password: string): Promise<Admin | undefined> {
        try {
            const admin: Admin = await this.adminRepository.findOne({ where : { login } });
            if (admin) {
                const hash = await bcrypt.hash(password, 10);
                admin.password = hash;
                await this.adminRepository.save(admin);
                return admin;
            }
        } catch (err) {
            throw err;
        }
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        try {
            return (await bcrypt.compare(password, hash));
        } catch (err) {
            throw err;
        }
    }

    async createIfNotExist(name: string, login: string, password: string): Promise<Admin> {
        try {
            const found = await this.findOne(login);
            if (!found) {
                const hash = await bcrypt.hash(password, 10);
                const admin: Admin = await this.adminRepository.save({ name, login, password: hash });
                return admin;
            }
        } catch (err) {
            throw err;
        }
    }
}
