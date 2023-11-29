import { readFile, writeFile, appendFile } from 'fs/promises';
import * as path from 'path';
import * as process from 'process';

const templates = {
  info: {
    text: '[INFO] [%date%] [%module%] DATA ===> \n%massage%',
  },
};

type RequestHeader = 'REQUEST' | 'RESPONSE' | 'FUNCTION' | 'ERROR';

export default class Logger {

  async readLog(
    method: string,
    pathDir: string,
    headers = 'NOT HEADERS',
    type: RequestHeader,
    source: string,
    data = 'NOT DATA',
  ) {
    let str = `[INFO] [${new Date().toJSON()}] [SOURCE: ${source}] [${type}] [METHOD: ${method}]  [PATH: ${pathDir}] [HEADERS: ${headers}] DATA: ${data}\n`;

    await appendFile(path.resolve("./logs", 'logs.log'), str, {
      encoding: 'utf8',
    });
  }
}
