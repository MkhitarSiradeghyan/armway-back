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
} from '@nestjs/common';
import { TourService } from './tour.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../configs/multer.config';
import { UploadService } from '../upload/upload.service';
import { slugConvert } from '../utils/slugConvert';
import { Langauge as Lang } from '../typeorm/lang.enum';
import { AdminGuard } from 'src/admin/admin.guard';


@Controller('tour')
export class TourController {
  constructor(
    private readonly tourService: TourService,
    private readonly uploadService: UploadService
  ) {}

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
    return true;
  }

  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }], multerConfig))
  async create(@Body() body, @UploadedFiles() files: any) {
    try {
      if (!this.checkBody(body))
        throw new Error('Not valid information provided');
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
