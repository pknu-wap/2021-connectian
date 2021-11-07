import { Module } from '@nestjs/common';
import { NodeEnvsGuard } from './config.guard';

@Module({
  providers: [NodeEnvsGuard],
})
export class ConfigModule {}
