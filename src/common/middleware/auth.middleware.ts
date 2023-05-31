import { Request, Response, NextFunction, response } from "express";
import  * as jwt from "jsonwebtoken"
import * as process from "process";

type DecodeType = { login: string, iat: number, exp: number }
export function verifyToken(req: Request, res: Response, next: NextFunction) {

  jwt.verify(req.body.access_token, process.env.JWT_CONSTANT_ACCESS_TOKEN, {complete: false}, (err, decoded: DecodeType) => {
    if(err) {
      jwt.verify(req.body.refresh_token, process.env.JWT_CONSTANT_REFRESH_TOKEN, (err, decoded: DecodeType) => {
        if(err){
          console.log('ERROR REFRESH TOKEN: ', err)
          res.status(403).send('Access denied')
        } else  {
          console.log('SUCCESS REFRESH TOKEN: ', decoded)
          req.body.login = decoded.login
          next();
        }
      })

    } else {
      console.log('SUCCESS CHECK ACCESS TOKEN')
      res.status(200).send({access_token: req.body.access_token, refresh_token: req.body.refresh_token})
    }
  })

}