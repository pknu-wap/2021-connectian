import { SetMetadata } from '@nestjs/common';

export const NodeEnv_KEY = 'NodeEnv';
export const NodeEnvs = (...args: string[]) => SetMetadata(NodeEnv_KEY, args);
