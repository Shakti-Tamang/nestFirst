import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Context in this case helps the class understand the current situation or request,
  //  so it can decide how to respond.
    // 
    // super object of prent AuthGuard
    // Instead, it is an object provided by NestJS that gives information about the 
    // current request or execution environment. The context is passed to the 
    // canActivate method in your JwtAuthGuard class so that it can decide whether or
    //  not to allow the request to proceed based on the details of that request.    
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
