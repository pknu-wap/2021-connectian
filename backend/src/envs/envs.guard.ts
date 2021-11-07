import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NodeEnvEnum } from './env.enum';
import { NodeEnv_KEY } from './envs.decorator';
import { NODE_ENV } from './envs';

@Injectable()
export class NodeEnvsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<NodeEnvEnum[]>(
      NodeEnv_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;
    return required.some((env) => env === NODE_ENV);
  }
}
