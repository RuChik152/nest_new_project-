import { readdir,readFile } from "fs/promises";
import { extname } from "path";
import * as process from "process";

export class ScanDir {
  readonly #pathFolder: string
  readonly #map: any
  #objMap: object

  constructor(pathFolder: string) {
    this.#pathFolder = pathFolder;
    this.#map = []
    this.#objMap = {}
  }

  get JSONdata() {
    return this.#objMap
  }

  async scanReadDirNode () {
    await this.#scanDir(this.#pathFolder, String(Math.round(Math.random() * 10000000000)));
    this.#map.splice(0, 1);
    this.#createJsonMap()
  }

  async #scanDir(pathFolder: string, id: string) {
    try {
      const dir = await readdir(pathFolder, {encoding: 'utf8', withFileTypes: true})
      const obj = Object.assign({}, {id: id})
      this.#map.push(obj);

      const nameDir = pathFolder.replace(`${this.#pathFolder}/`, '');
      const findObj = this.#map.find(e => e.id == id)
      findObj.name = nameDir

      for (let el in dir) {
          if(dir[el].isFile()){
            const checkTypeFile = this.#isTypeFile(dir[el].name);
            switch (checkTypeFile){
              case 'text':
                findObj.description = await this.#getTextData(`${pathFolder}/${dir[el].name}`);
                break;
              case 'image':
                findObj.IconUrl = `${process.env.HOST_NAME}/history/imag/${dir[el].name}`;
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

  #createJsonMap(){
    for(let el in this.#map) {
      this.#objMap[`${this.#map[el].name}`] = Object.assign({}, {
        name:this.#map[el].name,
        description: this.#map[el].description,
        IconUrl: this.#map[el].IconUrl,
        hash: this.#map[el].hash,
      })
    }
  }



}