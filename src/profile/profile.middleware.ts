import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response,Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { conectarDB } from '../../src/database/mongo.js';
import { ObjectId } from 'mongodb';
dotenv.config()

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.token

      if (!token) {
        return res.status(401).json({error:'Error de autenticación'})
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const userID = decoded.UserID

      const db = await conectarDB()
      const users = await db.collection('users')

      const userData = await users.findOne({_id:new ObjectId(userID)})

      req.user = userData

      next()


    } catch (error) {
      return res.status(401).json({error:'Error de autenticación'})
    }
  }
}
