import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    // context le yei classko ho bhanera chinaucha
    // 
    // super object of prent AuthGuard
    
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
