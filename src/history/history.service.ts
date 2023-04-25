import { Injectable } from '@nestjs/common';
import {mkdir, writeFile} from 'node:fs/promises';
import { readdir, appendFile } from 'node:fs/promises';
import * as process from "process";
import { createHashSumm } from "./history.utils";



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
      console.error('ERROR',error);
    }
  }

}
