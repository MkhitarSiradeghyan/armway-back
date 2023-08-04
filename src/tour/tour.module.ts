import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from '../typeorm/tour.entity';
import { TourTranslation } from '../typeorm/tour-translation.entity';
import { UploadService } from 'src/upload/upload.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour, TourTranslation]),
    AdminModule,
  ],
  controllers: [TourController],
  providers: [TourService, UploadService]
})
export class TourModule {}
