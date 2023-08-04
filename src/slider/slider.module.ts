import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { AdminModule } from 'src/admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from 'src/typeorm/slider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slider]),
    AdminModule
  ],
  controllers: [SliderController],
  providers: [SliderService]
})
export class SliderModule {}
