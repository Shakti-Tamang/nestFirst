import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';


// here is use of injectable so we can we it anywhere
@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req:Request, res:Response, next: NextFunction) {
console.log('example middleware');
    next();
  }
}
