import { readdir,readFile } from "fs/promises";
import { extname } from "path";
import * as process from "process";

export class ScanDir {
  readonly pathFolder: string
  readonly map: any
  readonly newMap: string[]
  // readonly parentDir: any

  constructor(pathFolder: string) {
    this.pathFolder = pathFolder;
    // this.parentDir = this.#initParentDir();
    this.map = []
    this.newMap = []
  }


  async scanReadDirNode () {
    console.log('this.pathFolder', this.pathFolder);

    await this.#scanDir(this.pathFolder, String(Math.round(Math.random() * 10000000000)));
    console.log('MAP: ', this.map);
  }

  async #scanDir(pathFolder: string, id: string) {
    try {
      const dir = await readdir(pathFolder, {encoding: 'utf8', withFileTypes: true})
      const obj = Object.assign({}, {id: id})
      this.map.push(obj);

      console.log(pathFolder)

      for (let el in dir) {
          if(dir[el].isFile()){
            const findObj = this.map.find(e => e.id == id)
            const checkTypeFile = this.#isTypeFile(dir[el].name);

            const nameDir = pathFolder.replace(`${this.pathFolder}/`, '');

            switch (checkTypeFile){
              case 'text':
                findObj.description = await this.#getTextData(`${pathFolder}/${dir[el].name}`);
                break;
              case 'image':
                findObj.image = `${process.env.HOST_NAME}/history/imag/${dir[el].name}`;
                break;
              default:
                findObj[`${dir[el].name}`] = await this.#getTextData(`${pathFolder}/${dir[el].name}`);
            }

          } else {
            await this.#scanDir(`${pathFolder}/${dir[el].name}`, String(Math.round(Math.random() * 10000000000)));
          }
      }

    } catch (error) {
      console.log('ScanDir scanDir ERROR: ', error)
      return null;
    }
  }

  #isTypeFile (file: string): string | null {
    const fileExtName = extname(file)
    switch (fileExtName) {
      case '.txt':
        return 'text'
      case '.png':
      case '.webp':
      case '.jpg':
        return 'image'
      default:
        return null
    }
  }

  #getTextData(pathFile:string) : Promise<string> {
    return readFile(pathFile, { encoding: "utf-8" })
  }

}