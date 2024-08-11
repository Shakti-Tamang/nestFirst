import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

import { Request } from 'express';
import { jina } from 'src/shakti/Entity/ram.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // If no roles are specified, allow access
    }

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as jina; // TypeScript now knows about the `user` property

    return requiredRoles.some((role) => user.role === role);
  }
}
