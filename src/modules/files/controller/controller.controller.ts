import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../services/files.service';

@Controller('upload')
export class filesController {
  constructor(private service: FilesService) { }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: any,
    @Headers() header: any,
  ) {
    return await this.service.upload(file, body.clientId, +header.companyid);
  }
}
