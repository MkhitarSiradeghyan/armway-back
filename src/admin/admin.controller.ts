import { Controller, Get, Post, Body, Headers, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { getPayload } from 'src/utils/getPayload';

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
      let saveLoggedInAdmin : Array<string> = await this.cacheM.get('logged_in');
      if (saveLoggedInAdmin === undefined)
        saveLoggedInAdmin = [];
      saveLoggedInAdmin.push(token);
      await this.cacheM.set('logged_in', saveLoggedInAdmin, 0);
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
  @UseGuards(AdminGuard)
  async logout(@Headers() headers) {
    try {
      const token = getPayload(headers);
      console.log(token);
      
      if (token === undefined)
        throw new Error('token is undefined');
      let saveLoggedInAdmin : Array<string> = await this.cacheM.get('logged_in');
      if (saveLoggedInAdmin === undefined)
        saveLoggedInAdmin = [];
      const index = saveLoggedInAdmin.indexOf(token);
      if (index === -1)
        throw new Error('token is not found');
      saveLoggedInAdmin.splice(index, 1);
      await this.cacheM.set('logged_in', saveLoggedInAdmin, 0);
      return { error: null, body: null };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }
}
