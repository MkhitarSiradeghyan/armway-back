import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
export declare class AdminGuard implements CanActivate {
    private readonly jwtService;
    private cacheManager;
    constructor(jwtService: JwtService, cacheManager: Cache);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
