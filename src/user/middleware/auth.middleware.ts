import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaService } from '../../prisma.service';
import { IUserExpressResponse } from '../types/userExpressResponse.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: IUserExpressResponse, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req = null;

      next();
      return;
    }

    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      //Bearer 213213213wqeqweqwe
      const token = req.headers.authorization.split(' ')[1];
      if (!token) new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);

      const decoded = verify(token, process.env.JWT_SECRET);

      const user = await this.prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
      });
      if (!user)
        new HttpException(
          'Not valid userdata',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      req.user = user;
      next();
    } catch (err) {
      req = null;
      next();
    }
  }
}
