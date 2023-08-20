import { Repository } from 'typeorm';
import { Admin } from '../typeorm/admin.entity';
export declare class AdminService {
    private readonly adminRepository;
    constructor(adminRepository: Repository<Admin>);
    findOne(login: string): Promise<Admin | undefined>;
    changePassword(login: string, password: string): Promise<Admin | undefined>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    createIfNotExist(name: string, login: string, password: string): Promise<Admin>;
}
