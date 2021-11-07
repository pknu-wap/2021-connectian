import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ChatsModule } from '../chats/chats.module';
import { ChatsService } from '../chats/chats.service';
import { jwtConstants } from '../envs/envs';

@Module({
  providers: [EventsGateway, EventsService, ChatsService],
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
    ChatsModule,
  ],
  controllers: [EventsController],
})
export class EventsModule {}
