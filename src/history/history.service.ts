import { Injectable } from "@nestjs/common";
import { appendFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import * as process from "process";
import { createHashSumm, getImage } from "./history.utils";
import { ScanDir } from "../lib/ScanDir";
import { createReadStream } from "fs";
import { join } from "path";


@Injectable()
export class HistoryService {
 async creat(data: any) {
    try {
      await mkdir(`${process.env.PATH_STORAGE_HISTORYS}/${data.name}`, {recursive: true});
      await writeFile(`${process.env.PATH_STORAGE_HISTORYS}/${data.name}/${data.name}.txt`, data.text, {encoding:'utf8'});
      return true;
    } catch (error) {
      console.log('ERROR: ', error)
      return error;
    }
  }

  async hash(name: string){
    try {
      const filesData = await readdir(`${process.env.PATH_STORAGE_HISTORYS}/${name}`);
      const hash = await createHashSumm(process.env.PATH_STORAGE_HISTORYS,{files:filesData, nameChildFolder:name});
      await appendFile(`${process.env.PATH_STORAGE_HISTORYS}/${name}/hash`, hash);
      return true
    } catch (error) {
      console.error('Hash HistoryService [ERROR]: ',error);
    }
  }

  async getHash(nameHistory: string) {
    try {
      return await readFile(`${process.env.PATH_STORAGE_HISTORYS}/${nameHistory}/hash`, { encoding: 'utf8' });
    } catch (error) {
      console.log('GetHash HistoryService [ERROR]: ', error)
    }
  }

  async getAllDataResources() {
   try {
      const dataFolder = await readdir(process.env.PATH_STORAGE_HISTORYS);
      // await starReadDir(process.env.PATH_STORAGE_HISTORYS)
      const dirList = new ScanDir(process.env.PATH_STORAGE_HISTORYS)
      await dirList.scanReadDirNode();
   }catch (error) {
     console.log('GetAllDataResources HistoryService [ERROR]: ', error)
   }
  }

  async getImageData(imgName:string) {
      const dirName = imgName.replace(/\..*$/ig, '');
      const path = `${process.env.PATH_STORAGE_HISTORYS}/${dirName}`
      return createReadStream(join(path, imgName));
  }
}
