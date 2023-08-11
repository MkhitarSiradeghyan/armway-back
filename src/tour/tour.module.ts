import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from '../typeorm/tour.entity';
import { TourTranslation } from '../typeorm/tour-translation.entity';
import { UploadService } from 'src/upload/upload.service';
import { AdminModule } from 'src/admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour, TourTranslation]),
    AdminModule,
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //   },
    //   // transport: `smtps://armwayticket@gmail.com:${process.env.EMAIL_PASSWORD}@smtp.gmail.com`,
    //   // defaults: {
    //   //   from: `"nest-modules" <${process.env.EMAIL}>`,
    //   // },
    // }),
  ],
  controllers: [TourController],
  providers: [TourService, UploadService]
})
export class TourModule {}
