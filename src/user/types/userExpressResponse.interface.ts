import { Request } from 'express';
import { User } from '@prisma/client';

export interface IUserExpressResponse extends Request {
  user: User;
}
