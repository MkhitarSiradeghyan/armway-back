import { diskStorage } from 'multer';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'public'),
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  // fileFilter: (req, file, callback) => {
  //   if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
  //       callback(null, true);
  //   } else {
  //       callback(new Error('Only image files (of type JPG, JPEG, PNG, GIF) are allowed!'), false);
  //   }
  // },
};