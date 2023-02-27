import { IErrorResponse } from './errorResponse.interface';
import { IMessageResponse } from './messageResponse.interface';

export type TInformationResponse = IMessageResponse | IErrorResponse;
