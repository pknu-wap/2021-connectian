import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { UsersService } from '../users/users.service';

@Module({
  providers: [ChatsService, UsersService],
  controllers: [ChatsController],
})
export class ChatsModule {}
