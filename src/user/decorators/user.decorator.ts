import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserExpressResponse } from '../types/userExpressResponse.interface';

export const UserInfo = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IUserExpressResponse>();

    if (!request.user) return null;

    if (data) return request.user[data];

    return request.user;
  },
);
