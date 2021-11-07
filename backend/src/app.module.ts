import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { IndexModule } from './index/index.module';
import { RolesModule } from './roles/roles.module';
import { ChatsModule } from './chats/chats.module';
import { EnvsModule } from './envs/envs.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    TestModule,
    AuthModule,
    IndexModule,
    RolesModule,
    ChatsModule,
    EnvsModule,
  ],
})
export class AppModule {}
