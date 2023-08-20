import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
export declare class AdminController {
    private readonly adminService;
    private readonly jwtService;
    private cacheM;
    constructor(adminService: AdminService, jwtService: JwtService, cacheM: Cache);
    generateToken(admin: any): Promise<string>;
    saveLoggedInAdmin(token: string): Promise<void>;
    login(body: any): Promise<{
        error: any;
        body: {
            token: string;
            admin: {
                name: string;
                login: string;
            };
        };
    } | {
        error: any;
        body: any;
    }>;
    checkChangePasswordBody(body: any): void;
    changePassword(body: any, headers: any): Promise<{
        error: any;
        body: any;
    }>;
    logout(headers: any): Promise<{
        error: any;
        body: any;
    }>;
}
