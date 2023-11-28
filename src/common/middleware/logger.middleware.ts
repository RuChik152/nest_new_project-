import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import Logger from '../../utils/Logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    // console.log(
    //   '-------------------------\n-----MIDDLEWARE LOGS-----\n-------------------------',
    //   {
    //     date: new Date().toJSON(),
    //     headers: req.headers,
    //     method: req.method,
    //     path: req.url,
    //   },
    // );
    // await new Logger().readLog(
    //   req.method,
    //   req.url,
    //   JSON.stringify(req.headers),
    //   'REQUEST',
    //   'MIDDLEWARE',
    // );
    // console.log(
    //   '-------------------------\n-----MIDDLEWARE LOGS RESPONSE-----\n-------------------------',
    //   {
    //     date: new Date().toJSON(),
    //     RESPONSE: res
    //   },
    // );
    next();
  }
}
