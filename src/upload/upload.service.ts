import { Injectable } from '@nestjs/common';
import { multerConfig } from '../configs/multer.config';
// import { MulterDiskUploadedFiles, MulterS3UploadedFiles } from './interfaces'; // Define your own interfaces for uploaded files

@Injectable()
export class UploadService {
  uploadFiles(files: any): Array<string> {
    // dont know if i should implement some additional logic to upload it properly
    const file_names = [];
    console.log(files);
    
    files.forEach(file => {
        file_names.push(file.filename);
    });
    return file_names;
  }
}