import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IUserExpressResponse } from '../types/userExpressResponse.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IUserExpressResponse>();

    if (request.body) return true;

    throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
  }
}
