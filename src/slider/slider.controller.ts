import { 
  Controller, 
  Post, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile,
  Body,
  Get,
  Delete,
  Param
} from '@nestjs/common';
import { Langauge as Lang } from 'src/typeorm/lang.enum';
import { SliderService } from './slider.service';
import { AdminGuard } from 'src/admin/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';


@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  checkBody(body): boolean {
    if (body.title_am === undefined)
      return false;
    if (body.title_en === undefined)
      return false;
    if (body.title_ru === undefined)
      return false;
    return true;
  }

  @Get()
  async findAll() {
    try {
      const sliders = await this.sliderService.findAll();
      return { error: null, body: sliders };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@Body() body, @UploadedFile() file: any) {
    try {
      if (this.checkBody(body) === false)
        throw new Error('some fields are missing');
      const image = await file.filename;
      const titles = [];
      titles[Lang.AM] = body.title_am;
      titles[Lang.RU] = body.title_ru;
      titles[Lang.EN] = body.title_en;
      await this.sliderService.create(titles, image);
      return { error: null, body: null };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async delete(@Param() params) {
    try {
      const id = params.id;
      if (id === undefined)
        throw new Error('id is undefined');
      await this.sliderService.delete(id);
      return { error: null, body: null };
    } catch (err) {
      return { error: err.message, body: null };
    }
  }
}
