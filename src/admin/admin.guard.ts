import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Inject,
  } from '@nestjs/common';
  import { CACHE_MANAGER } from '@nestjs/cache-manager';
  import { Cache } from 'cache-manager';
  import { Observable } from 'rxjs';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(
      // private readonly jwtService: JwtService,
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        const jwtoken = request.headers['authorization'].split(' ')[1];
        if (jwtoken != 'undefined') {
        //   const payload = this.jwtService.verify(jwtoken, {
        //     secret: process.env.JWT_SECRET,
        //   });
          return this.cacheManager.get('token').then((res: Array<string>) => {
            if (res && res == jwtoken) {
              return true;
            }
          });
        }
        return false;
      } catch (err) {
        return false;
      }
    }
  }
  