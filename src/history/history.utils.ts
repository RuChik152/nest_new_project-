import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as process from "process";
import { readFile, readdir } from 'node:fs/promises';
import {createHash} from "node:crypto";
import { Buffer } from 'node:buffer';
import * as path from "path";


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

  // const path = `${process.env.PATH_STORAGE_HISTORYS}\\${pagaName}`

  const pathFile = path.resolve(process.env.PATH_STORAGE_HISTORYS, pagaName)
  callback(null, pathFile);
}

interface HashSumTypesOptions {
  nameChildFolder?: string,
  files: String[] | string,
}

export const createHashSumm = async (parentFolder: string, options: HashSumTypesOptions) => {
  const hash = createHash('sha256');
  let stringPathFolder: string;
 if(typeof options.files === 'object') {
   const arrBuff: Buffer[] = []
   if(options.nameChildFolder) {
     // stringPathFolder = `${parentFolder}/${options.nameChildFolder}`
     stringPathFolder = path.resolve(parentFolder, options.nameChildFolder)
   } else {
     // stringPathFolder = `${parentFolder}`
     stringPathFolder = path.resolve(parentFolder)
   }

   for(let el in options.files){
     // const bufFile = await readFile(`${stringPathFolder}/${options.files[el]}`);
     const bufFile = await readFile(path.resolve(stringPathFolder,`${options.files[el]}`));
     arrBuff.push(bufFile)
   }

   const concatBuffer = Buffer.concat(arrBuff);
   hash.update(concatBuffer)
   return String(hash.digest('hex'));
 } else {
   if(options.nameChildFolder) {
     // stringPathFolder = `${parentFolder}/${options.nameChildFolder}`
     stringPathFolder = path.resolve(parentFolder, options.nameChildFolder)
   } else {
     // stringPathFolder = `${parentFolder}`
     stringPathFolder = path.resolve(parentFolder)
   }
   // const bufFile = await readFile(`${stringPathFolder}/${options.files}`);
   const bufFile = await readFile(path.resolve(stringPathFolder, options.files));
   hash.update(bufFile)

   return String(hash.digest('hex'));
 }
}

// interface ScanDirType {
//   parentDir: string,
// }

// export const starReadDir = async (parentDirPath) => {
//    const map = await scanDir(parentDirPath);
//    console.log('MAP => ', map);
// }

// const scanDir = async (path) => {
//   const map = [];
//   const dir = await readdir(path, {encoding: 'utf8', withFileTypes: true})
//   console.log(dir)
//
//   for (let value in dir) {
//     map.push(`${path}\\${dir[value].name}`)
//     if(dir[value].isDirectory()) {
//       await scanDir(`${path}\\${dir[value].name}`)
//     }
//   }
//
//   // console.log('MAP => ', map);
//   return map
// }

// export const _getAllFilesFolder = async (dir: string) => {
//   const filesystem = require("fs");
//   let results = [];
//
//   filesystem.appendFileSync(dir).forEach((file) => {
//     file = dir+'/'+file;
//     const stat = filesystem.statSync(file);
//
//     if (stat && stat.isDirectory()) {
//       results = results.concat(_getAllFilesFolder(file))
//     } else results.push(file);
//   });
//
//   return results;
// }

export const getImage = async (fileName: string) => {
  const dirName = fileName.replace(/\..*$/ig, '');
  // return await readFile(`${process.env.PATH_STORAGE_HISTORYS}/${dirName}/${fileName}`)
  return await readFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, dirName, fileName))
}

