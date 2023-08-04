import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from 'src/typeorm/gallery.entity';
import { AdminModule } from 'src/admin/admin.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery]),
    AdminModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
