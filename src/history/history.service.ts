import { Injectable } from '@nestjs/common';
import {mkdir, writeFile} from 'node:fs/promises';
import * as process from "process";



@Injectable()
export class HistoryService {
 async creat(data: any) {
    try {
      const creatHistoryDir = await mkdir(`${process.env.PATH_STORAGE_HISTORYS}/${data.name}`, {recursive: true});
      const creatHistoryDes = await writeFile(`${process.env.PATH_STORAGE_HISTORYS}/${data.name}/${data.name}.txt`, data.text, {encoding:'utf8'});
      console.log('CREATE DIR: ', creatHistoryDir);
      console.log('CREATE FILE: ', creatHistoryDes);
      return creatHistoryDir;
    } catch (error) {
      console.log('ERROR: ', error)
      return error;
    }
  }
}
