import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken'
import * as process from "process";

process.env;
@Injectable()
export class DeviceMiddleware implements NestMiddleware {

  private privateKey: string;

  constructor() {
    this.privateKey = fs.readFileSync(`${process.env.RSA_PRIVATE_KEY}`, 'utf8')
  }
  use(req: Request, res: Response, next: Function) {
    const token = req.header("XXX-JWT-Token")
      try {
        jwt.verify(token, this.privateKey)
        next();
      } catch (err) {
        res.status(403).send("Bad Request")
      }
  }
}
