import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { Admin } from '../typeorm/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]), 
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    CacheModule.register(),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtService],
  exports: [AdminService, CacheModule],
})
export class AdminModule {}
