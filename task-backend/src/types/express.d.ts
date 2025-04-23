import { Request } from 'express';

declare module 'express' {
  export interface Request {
    tokenData?: { id: number; email: string };
  }
}
