import { User } from '.prisma/client';

const jwt = require('jsonwebtoken');

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { IUserExpressResponse } from '../types/userExpressResponse.interface';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  readonly role: User['role'];
  constructor(readonly protectedRole: User['role']) {
    console.log('AuthMiddleware');
    this.role = protectedRole;
  }
  async use(req: IUserExpressResponse, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1]; // Bearer 213213213wqeqweqwe
      if (!token) new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== this.role) {
        new HttpException('Not authorized', HttpStatus.NOT_ACCEPTABLE);
      }

      req.user = decoded;
      next();
    } catch (e) {
      new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
