import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventsGateway } from './events.gateway';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ChatsModule } from '../chats/chats.module';
import { ChatsService } from '../chats/chats.service';

@Module({
  providers: [EventsGateway, EventsService, ChatsService, ConfigService],
  controllers: [EventsController],
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('SESSION_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService],
    }),
    ChatsModule,
  ],
})
export class EventsModule {}
