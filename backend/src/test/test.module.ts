import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [TestController],
  providers: [UsersService],
})
export class TestModule {}
