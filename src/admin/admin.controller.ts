import { Controller, Get, Post, Body, Query, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheM: Cache,
  ) {}

  async generateToken(admin): Promise<string> {
    try {
      const token = await this.jwtService.sign({
          admin: admin.login,
        },
        { secret: process.env.JWT_SECRET },
      );
      return token;
    } catch (err) {
      throw err;
    }
  }

  async saveLoggedInAdmin(token: string) {
    try {
      await this.cacheM.set('token', token, 0);
    } catch (err) {
      throw err;
    }
  }

  @Post('login')
  async login(@Body() body) {
    try {
      const login = body.login;
      const password = body.password;
      if (login === undefined || password === undefined)
        throw new Error('login or password is undefined');
      
      const admin = await this.adminService.findOne(login);
      if (admin) {
        if (await this.adminService.comparePassword(password, admin.password))
        {
          const token: string = await this.generateToken(admin);
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
      } else {
        throw new Error('login is incorrect');
      }
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  @Get('logout')
  async logout(@Query() query) {
    try {
      const token = query.token;
      if (token === undefined)
        throw new Error('token is undefined');
      await this.cacheM.del('token');
      return { error: null, body: null };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }
}
