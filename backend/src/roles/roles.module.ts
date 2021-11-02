import { Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UsersService } from '../users/users.service';

@Module({
  providers: [RolesGuard, UsersService],
})
export class RolesModule {}
