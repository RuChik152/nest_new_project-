import { Injectable } from "@nestjs/common";
import { mkdir, readdir, readFile, writeFile, rm } from "node:fs/promises";
import * as process from "process";
import { createHashSumm, updateResourceMapAndCreateNewZip } from "./history.utils";
import { ScanDir } from "../lib/ScanDir";
import { createReadStream } from "fs";
import { Compressor } from "../lib/Compressor";
import * as path from "path";
import { CreateHistoryDto } from "./dto/create-history.dto";


@Injectable()
export class HistoryService {
  async creat(data: any) {
    try {
      await mkdir(path.resolve(process.env.PATH_STORAGE_HISTORYS, data.name), { recursive: true });
      await writeFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, data.name, `${data.name}.txt`), data.text, { encoding: "utf8" });
      return true;
    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }
  }

  async hash(name: string) {
    try {
      const filesData = await readdir(path.resolve(process.env.PATH_STORAGE_HISTORYS, name));

      const hash = await createHashSumm(path.resolve(process.env.PATH_STORAGE_HISTORYS), {
        files: filesData,
        nameChildFolder: name
      });

      await writeFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, name, `hash`), hash);

      const dirList = new ScanDir(path.resolve(process.env.PATH_STORAGE_HISTORYS));
      await dirList.scanReadDirNode();

      await writeFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, "resource_map.json"), JSON.stringify(dirList.JSONdata), { encoding: "utf-8" });

      console.log("Hash HistoryService: process.env.PATH_STORAGE_HISTORYS => ", process.env.PATH_STORAGE_HISTORYS);
      console.log("Hash HistoryService: process.env.PATH_STORAGE_HISTORYS_ZIP => ", process.env.PATH_STORAGE_HISTORYS_ZIP);
      await new Compressor(path.resolve(process.env.PATH_STORAGE_HISTORYS), path.resolve(process.env.PATH_STORAGE_HISTORYS_ZIP)).zip();

      return true;
    } catch (error) {
      console.error("Hash HistoryService [ERROR]: ", error);
    }
  }

  async getHash(nameHistory: string) {
    try {
      return await readFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, nameHistory, `hash`), { encoding: "utf8" });
    } catch (error) {
      console.log("GetHash HistoryService [ERROR]: ", error);
    }
  }

  async updateHash(nameHistory: string) {
    try {
      const filesData = await readdir(path.resolve(process.env.PATH_STORAGE_HISTORYS, nameHistory));

      const hash = await createHashSumm(path.resolve(process.env.PATH_STORAGE_HISTORYS), {
        files: filesData,
        nameChildFolder: nameHistory
      });

      await writeFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, nameHistory, `hash`), hash);

      const dirList = new ScanDir(path.resolve(process.env.PATH_STORAGE_HISTORYS));
      await dirList.scanReadDirNode();

      await writeFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, `resource_map.json`), JSON.stringify(dirList.JSONdata), { encoding: "utf-8" });

      await new Compressor(path.resolve(process.env.PATH_STORAGE_HISTORYS), path.resolve(process.env.PATH_STORAGE_HISTORYS_ZIP)).zip();

      return await readFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, nameHistory, `hash`), { encoding: "utf8" });
    } catch (error) {
      console.log("UpdateHash HistoryService [ERROR]: ", error);
    }
  }

  async getAllDataResources() {
    try {
      return createReadStream(path.resolve(process.env.PATH_STORAGE_HISTORYS_ZIP));
    } catch (error) {
      console.log("GetAllDataResources HistoryService [ERROR]: ", error);
    }
  }

  async creatGzip() {
    try {
      await new Compressor(path.resolve(process.env.PATH_STORAGE_HISTORYS), path.resolve(process.env.PATH_STORAGE_HISTORYS_ZIP)).zip();
    } catch (error) {
      console.log("SendGzipClient HistoryService [ERROR]: ", error);
    }
  }

  getImageData(imgName: string) {
    const dirName = imgName.replace(/\..*$/ig, "");

    const paths = path.resolve(process.env.PATH_STORAGE_HISTORYS, dirName);

    return createReadStream(path.resolve(paths, imgName));
  }

  async getDiffResourceMap() {
    const dirList = new ScanDir(path.resolve(process.env.PATH_STORAGE_HISTORYS));
    await dirList.scanReadDirNode();

    await writeFile(path.resolve(process.env.PATH_STORAGE_HYSTORYS_ZIP_FOLDER, `resource_map_diff.json`), JSON.stringify(dirList.JSONdata), { encoding: "utf-8" });

    return readFile(path.resolve(process.env.PATH_STORAGE_HYSTORYS_ZIP_FOLDER, `resource_map_diff.json`), { encoding: "utf8" });
  }

  async diffResource(diffData: object) {
    const readMapJson = await readFile(path.resolve(process.env.PATH_MAP_STORAGE), { encoding: "utf8" });

    const currentData = JSON.parse(readMapJson);
    const listUpdate: String[] = [];


    for (let elCurr in currentData) {
      for (let elDiff in diffData) {
        if (currentData[elCurr].name === diffData[elDiff].name) {
          if (currentData[elCurr].hash !== diffData[elDiff].hash) {
            listUpdate.push(path.resolve(process.env.PATH_STORAGE_HISTORYS, `${currentData[elCurr].name}`));
          }
        }
      }
    }

    const arrCurr = Object.keys(currentData);
    const arrDiff = Object.keys(diffData);

    if (arrCurr.length !== arrDiff.length) {
      for (let elCurr in arrCurr) {
        const check = arrDiff.includes(arrCurr[elCurr]);
        if (!check) {
          listUpdate.push(path.resolve(process.env.PATH_STORAGE_HISTORYS, `${arrCurr[elCurr]}`));
        }
      }
    }

    listUpdate.push(path.resolve(process.env.PATH_STORAGE_HISTORYS, `resource_map.json`));

    await new Compressor(listUpdate, path.resolve(process.env.PATH_STORAGE_HISTORYS_ZIP_DIFF)).multZip();

    return createReadStream(path.resolve(process.env.PATH_STORAGE_HISTORYS_ZIP_DIFF));
  }

  async updateFileHistory(name: string, data: string) {
    await writeFile(path.resolve(process.env.PATH_STORAGE_HISTORYS, name, `${name}.txt`), data, "utf-8");
    return await this.updateHash(name);
  }

  async deleteHistory(name: string) {
    try {
      await rm(path.resolve(`${process.env.PATH_STORAGE_HISTORYS}`, name), {force: true, recursive: true})
      await updateResourceMapAndCreateNewZip()
      return true
    }catch (error) {
      console.log("DeleteHistory HistoryService [ERROR]: ", error);
      return error
    }
  }

  async getDataHistory(name: string) {
    try {
      const map = await readFile(path.resolve(`${process.env.PATH_STORAGE_HISTORYS}`, 'resource_map.json'), {encoding: "utf-8"})
      return JSON.parse(map)[name]
    } catch (error) {
      console.log("GetDataHistory HistoryService [ERROR]: ", error);
      return error
    }


  }

}
