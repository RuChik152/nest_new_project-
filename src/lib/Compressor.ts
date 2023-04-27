import * as child_process from "child_process";
import * as os from "os"
import * as process from "process";
import {rm} from "node:fs/promises"
import { createReadStream, existsSync } from "fs";


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
      try {
        if(existsSync(this.#pathStore)){
          await rm(this.#pathStore)
        }
        switch (this.#OS){
          case 'Windows_NT':
            this.#pathExe = process.env.PATH_TO_ZIP_WINDOWS
            break;
          default:
            this.#pathExe = process.env.PATH_TO_ZIP_LINUX
            break;
        }
        child_process.execFileSync(this.#pathExe, ['a', '-tzip', '-spe', '-mx5', '-r0', this.#pathStore, `${this.#pathFolder}\\*`])
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
              this.#pathExe = process.env.PATH_TO_ZIP_WINDOWS
              break;
            default:
              this.#pathExe = process.env.PATH_TO_ZIP_LINUX
              break;
          }
          // const arr = ['G:\\project\\BeliVR\\fileHistoryStorage\\NAME_STORY_1', 'G:\\project\\BeliVR\\fileHistoryStorage\\NEW_DIFF_HISTIRY']
          const arr = []
          arr.push(...this.#pathFolder)
          child_process.execFileSync(this.#pathExe, ['a', '-tzip', '-spe', '-mx5', '-r0', this.#pathStore, ...arr])
        }

      } catch (error) {

      }
    }
}