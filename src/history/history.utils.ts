import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as process from "process";

// Разрешить только изображения
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const params = req.params.name;
  const fileExtName = extname(file.originalname);
  const randomName = Math.round(Math.random() * 10000).toString(10);

  callback(null, `${params}__${randomName}${fileExtName}`);
}

export const filePathImg = (req, file, callback) => {
  const pagaName = req.params.name;
  const path = `${process.env.PATH_STORAGE_HISTORYS}\\${pagaName}`

  callback(null, path);
}