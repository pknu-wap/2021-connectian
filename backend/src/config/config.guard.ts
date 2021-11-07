import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NodeEnvEnum } from './config.enum';
import { NodeEnv_KEY } from './config.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodeEnvsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<NodeEnvEnum[]>(
      NodeEnv_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;
    return required.some(
      (env) => env === this.configService.get<string>('NODE_ENV'),
    );
  }
}
