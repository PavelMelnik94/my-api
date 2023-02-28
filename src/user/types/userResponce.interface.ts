import { User } from '@prisma/client';

export interface IUserResponse extends User {
  message?: string;
}

export interface IUserResponseWithToken extends User {
  token: string;
}
