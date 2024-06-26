import * as child_process from "child_process";
import * as os from "os"
import * as process from "process";
import {rm} from "node:fs/promises"
import { existsSync } from "fs";
import * as path from "path";


export class Compressor {
    #OS: string
    #pathExe: string
    #pathFolder: string | String[]
    #pathStore: string
    constructor(pathFolder: string | String[], pathStore: string) {
      this.#OS = os.type()
      this.#pathExe = '';
      this.#pathFolder = pathFolder;
      this.#pathStore = pathStore;
      this.#init();
    }

    #init() {
      console.log('OS', this.#OS)
    }
    async zip() {
      console.log("COMPRESSOR zip: this.#pathStore", this.#pathStore)
      console.log("COMPRESSOR zip: this.#pathFolder", this.#pathFolder)
      try {
        if(existsSync(this.#pathStore)){
          await rm(this.#pathStore)
        }
        switch (this.#OS){
          case 'Windows_NT':
            this.#pathExe = path.resolve(process.env.PATH_TO_ZIP_WINDOWS)
            break;
          default:
            this.#pathExe = process.env.PATH_TO_ZIP_LINUX
            break;
        }
        // child_process.execFileSync(this.#pathExe, ['a', '-tzip', '-spe', '-mx5', '-r0', this.#pathStore, `${this.#pathFolder}`])

        console.log("COMPRESSOR zip: path.resolve(`${this.#pathFolder}`, '*') => ", path.resolve(`${this.#pathFolder}`, '*'))
        // child_process.execFileSync(this.#pathExe, ['a', '-tzip', '-spe', '-mx5', '-r0', this.#pathStore, `${this.#pathFolder}\\*`])
        child_process.execFileSync(this.#pathExe, ['a', '-tzip', '-spe', '-mx5', '-r0', this.#pathStore, path.resolve(`${this.#pathFolder}`, '*')])
      } catch (error) {
        console.log('ERROR', error)
      }
    }

    async multZip(){
      try {
        if(existsSync(this.#pathStore)){
          await rm(this.#pathStore)
        }
        if(typeof this.#pathFolder === "object"){
          switch (this.#OS){
            case 'Windows_NT':
              this.#pathExe = path.resolve(process.env.PATH_TO_ZIP_WINDOWS)
              break;
            default:
              this.#pathExe = process.env.PATH_TO_ZIP_LINUX
              break;
          }
          const arr = []
          arr.push(...this.#pathFolder)
          child_process.execFileSync(this.#pathExe, ['a', '-tzip', '-spe', '-mx5', '-r0', this.#pathStore, ...arr])
        }

      } catch (error) {

      }
    }
}