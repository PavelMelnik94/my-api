import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IUserExpressResponse } from '../types/userExpressResponse.interface';
import { User } from '.prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly accessRoles: Array<User['role']>;
  constructor(roles: Array<User['role']>) {
    this.accessRoles = roles;
  }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IUserExpressResponse>();

    if (this.accessRoles.includes(request.user.role)) return true;

    throw new HttpException('Not authorized', HttpStatus.NOT_ACCEPTABLE);
  }
}
