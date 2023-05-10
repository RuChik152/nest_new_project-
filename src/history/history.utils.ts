import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as process from "process";
import { readFile, readdir } from 'node:fs/promises';
import {createHash} from "node:crypto";
import { Buffer } from 'node:buffer';
import * as path from "path";
import { HashSumTypesOptions } from "./history.types";


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

  callback(null, `${params}${fileExtName}`);
}

export const filePathImg = (req, file, callback) => {
  const pagaName = req.params.name;


  const pathFile = path.resolve(process.env.PATH_STORAGE_HISTORYS, pagaName)
  callback(null, pathFile);
}


export const createHashSumm = async (parentFolder: string, options: HashSumTypesOptions) => {
  const hash = createHash('sha256');
  let stringPathFolder: string;
 if(typeof options.files === 'object') {
   const arrBuff: Buffer[] = []
   if(options.nameChildFolder) {
     stringPathFolder = path.resolve(parentFolder, options.nameChildFolder)
   } else {
     stringPathFolder = path.resolve(parentFolder)
   }

   for(let el in options.files){
     const bufFile = await readFile(path.resolve(stringPathFolder,`${options.files[el]}`));
     arrBuff.push(bufFile)
   }

   const concatBuffer = Buffer.concat(arrBuff);
   hash.update(concatBuffer)
   return String(hash.digest('hex'));
 } else {
   if(options.nameChildFolder) {
     stringPathFolder = path.resolve(parentFolder, options.nameChildFolder)
   } else {
     stringPathFolder = path.resolve(parentFolder)
   }
   const bufFile = await readFile(path.resolve(stringPathFolder, options.files));
   hash.update(bufFile)

   return String(hash.digest('hex'));
 }
}

export const getImage = async (fileName: string) => {
  const dirName = fileName.replace(/\..*$/ig, '');
  return await readFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, dirName, fileName))
}

