import { 
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Get,
  Param,
  Delete,
  Req
  
} from '@nestjs/common';
import { TourService } from './tour.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../configs/multer.config';
import { UploadService } from '../upload/upload.service';
import { slugConvert } from '../utils/slugConvert';
import { Langauge as Lang } from '../typeorm/lang.enum';
import { AdminGuard } from 'src/admin/admin.guard';
import { Tour } from 'src/typeorm';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import {Request} from 'express'

@Controller('tour')
export class TourController {
  private transporter: nodemailer.Transporter;
  constructor(
    private readonly tourService: TourService,
    private readonly uploadService: UploadService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  checkBody(body): boolean {
    if (body.title_am === undefined)
      return false;
    if (body.title_en === undefined)
      return false;
    if (body.title_ru === undefined)
      return false;
    if (body.description_am === undefined)
      return false;
    if (body.description_en === undefined)
      return false;
    if (body.description_ru === undefined)
      return false;
    if (body.price === undefined)
      return false;
    return true;
  }

  checkBodyRegister(body): boolean {
    if (body.email === undefined)
      return false;
    if (body.name === undefined)
      return false;
    if (body.phone === undefined)
      return false;
    if (body.tour_id === undefined)
      return false;
    return true;
  }

  buildContent(body, tour: Tour): string {
    let content = '';
    content += `Name: ${body.name}\n`;
    content += `Email: ${body.email}\n`;
    content += `Phone: ${body.phone}\n`;
    content += `Tour: ${tour.translations[0].title} (#${tour.id})\n`;
    content += `Date: ${tour.date}\n`;
    return content;
  }

  /**
   * @param name 
   * @param email 
   * @param phone
   * @param tour_id
   *  
   * @returns { error: null, body: null }
   * @returns { error: error.msg, body: null }
   */
  @Post('register')
  async register(@Body() body) {
    try {
      console.log(body);
      
      if (!this.checkBodyRegister(body))
        throw new Error('Not valid information provided');
      const tour = await this.tourService.findOneBySlug(body.tour_id);
      if (tour)
        throw new Error('Not valid information provided');
      const content = this.buildContent(body, tour);
      const response = await this.transporter.sendMail({
        from: `Armway Mailer Agent<${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: 'Tour reservation',
        text: content,
        // html: '<b>welcome</b>',
      })
      return { error: null, body: null };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  private imagesPath = path.join(__dirname, '../..', 'public');

  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor('images', 50, multerConfig))
  async create(@Body() body, @UploadedFiles() files: any) {
    try {
      if (!this.checkBody(body))
        throw new Error('Not valid information provided');

      const date = body.date;
      const price = body.price;
      const titles = [];
      titles[Lang.AM] = body.title_am;
      titles[Lang.RU] = body.title_ru;
      titles[Lang.EN] = body.title_en;
      const descriptions = [];
      descriptions[Lang.AM] = body.description_am;
      descriptions[Lang.RU] = body.description_ru;
      descriptions[Lang.EN] = body.description_en;

      const uploadedFileNames = await this.uploadService.uploadFiles(files);
      const slug = slugConvert(body.title_am);
      const data = {
        titles,
        descriptions,
        slug,
        images: uploadedFileNames,
        date,
        price
      };
      const tour = await this.tourService.create(data);
      return { error: null, body: tour };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async delete(@Param() params) {
    const id = params.id;
    try {
      if (id === undefined)
        throw new Error('Not valid information provided');
      const tour = await this.tourService.delete(id);
      return { error: null, body: tour };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  @Get('getall')
  async getAll() {
    try {
      const tours = await this.tourService.findAll();
      return { error: null, body: tours };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  @Get(':slug')
  async get(@Param() params) {
    try {
      const tour = await this.tourService.findOneBySlug(params.slug);
      return { error: null, body: tour };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }
}
