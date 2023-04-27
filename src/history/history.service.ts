import { Injectable } from "@nestjs/common";
import { appendFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";

import * as process from "process";
import { createHashSumm, getImage } from "./history.utils";
import { ScanDir } from "../lib/ScanDir";
import { createReadStream, createWriteStream } from "fs";
import * as zlib from "zlib";
import { Compressor } from "../lib/Compressor";
import _ from "lodash";


import {promisify} from "node:util"
import {pipeline} from "node:stream"
import {createGzip} from "node:zlib"



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

   async updateHash(nameHistory: string) {
   try {
     const filesData = await readdir(`${process.env.PATH_STORAGE_HISTORYS}/${nameHistory}`);
     const hash = await createHashSumm(process.env.PATH_STORAGE_HISTORYS,{files:filesData, nameChildFolder:nameHistory});
     await writeFile(`${process.env.PATH_STORAGE_HISTORYS}/${nameHistory}/hash`, hash);
     return await readFile(`${process.env.PATH_STORAGE_HISTORYS}/${nameHistory}/hash`, { encoding: 'utf8' });
   } catch (error) {
     console.log('UpdateHash HistoryService [ERROR]: ', error)
   }
  }

  async getAllDataResources() {
   try {
      const dirList = new ScanDir(process.env.PATH_STORAGE_HISTORYS)
      await dirList.scanReadDirNode();
      await writeFile(`${process.env.PATH_STORAGE_HISTORYS}/resource_map.json`, JSON.stringify(dirList.JSONdata), {encoding: "utf-8"})
      await this.creatGzip();
      return createReadStream(process.env.PATH_STORAGE_HISTORYS_ZIP)
   }catch (error) {
     console.log('GetAllDataResources HistoryService [ERROR]: ', error)
   }
  }

  async creatGzip(){
   try {
     await new Compressor(process.env.PATH_STORAGE_HISTORYS, process.env.PATH_STORAGE_HISTORYS_ZIP).zip();
   } catch (error) {
     console.log('SendGzipClient HistoryService [ERROR]: ', error)
   }
  }

  getImageData(imgName:string) {
    const dirName = imgName.replace(/\..*$/ig, '');
    const path = `${process.env.PATH_STORAGE_HISTORYS}/${dirName}`
    return createReadStream(`${path}/${imgName}`);
  }

  async getDiffResourceMap(){
    const dirList = new ScanDir(process.env.PATH_STORAGE_HISTORYS)
    await dirList.scanReadDirNode();
    await writeFile(`${process.env.PATH_STORAGE_HYSTORYS_ZIP_FOLDER}/resource_map_diff.json`, JSON.stringify(dirList.JSONdata), {encoding: "utf-8"})
    return readFile(`${process.env.PATH_STORAGE_HYSTORYS_ZIP_FOLDER}/resource_map_diff.json`, {encoding: 'utf8'})
  }

  async diffResource(diffData: object) {

    const dirList = new ScanDir(process.env.PATH_STORAGE_HISTORYS)
    await dirList.scanReadDirNode();
    await writeFile(`${process.env.PATH_STORAGE_HISTORYS}/resource_map.json`, JSON.stringify(dirList.JSONdata), {encoding: "utf-8"})
    const currentData = dirList.JSONdata
    const listUpdate: String[] = []


    for (let elCurr in currentData){
      for (let elDiff in diffData){
        if(currentData[elCurr].name === diffData[elDiff].name){
          if(currentData[elCurr].hash !== diffData[elDiff].hash){
            listUpdate.push(`${process.env.PATH_STORAGE_HISTORYS}/${currentData[elCurr].name}`)
          }
        }
      }
    }


    listUpdate.push(`${process.env.PATH_STORAGE_HISTORYS}/resource_map.json`)
    console.log('DIFF_LIST', listUpdate);

    await new Compressor(listUpdate, process.env.PATH_STORAGE_HISTORYS_ZIP).multZip();

    return createReadStream(process.env.PATH_STORAGE_HISTORYS_ZIP)
  }

}
