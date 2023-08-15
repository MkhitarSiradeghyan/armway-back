import { 
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param
 } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AdminGuard } from 'src/admin/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';
import { Langauge as Lang } from 'src/typeorm/lang.enum';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService) {}

  @Get()
  async findAll() {
    try {
      const galleries = await this.galleryService.findAll();
      return { error: null, body: galleries };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  checkBody(body): boolean {
    if (body.isVideo === undefined)
      return false;
    if (body.isVideo == true)
      if (body.url === undefined)
        return false;
    if (body.title_am === undefined)
      return false;
    if (body.title_en === undefined)
      return false;
    if (body.title_ru === undefined)
      return false;
    return true;
  }

  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@Body() body, @UploadedFile() file: any) {
  try {
      if (this.checkBody(body) === false)
        throw new Error('some fields are missing');
      let url = '';
      const isVideo = body.isVideo;
      if (isVideo == false)
        url = body.url;
      else
        url = await file?.filename;
      const titles = [];
      titles[Lang.AM] = body.title_am;
      titles[Lang.RU] = body.title_ru;
      titles[Lang.EN] = body.title_en;
      await this.galleryService.create(isVideo, titles, url);
      return { error: null, body: null };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async delete(@Param() params) {
    console.log(params);
    
    try {
      const id = params.id;
      if (id === undefined)
        throw new Error('id is undefined');
      await this.galleryService.delete(id);
      return { error: null, body: null };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }
}
