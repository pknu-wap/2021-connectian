import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { IndexModule } from './index/index.module';
import { RolesModule } from './roles/roles.module';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    EventsModule,
    TestModule,
    AuthModule,
    IndexModule,
    RolesModule,
    ChatsModule,
    ConfigModule,
  ],
})
export class AppModule {}
