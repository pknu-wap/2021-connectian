import { Module } from '@nestjs/common';
import { NodeEnvsGuard } from './envs.guard';

@Module({
  providers: [NodeEnvsGuard],
})
export class EnvsModule {}
