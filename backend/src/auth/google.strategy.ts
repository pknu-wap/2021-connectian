import { Injectable } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super(
      {
        clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
        clientSecret: configService.get<string>('GOOGLE_SECRET'),
        callbackURL:
          configService.get<string>('GOOGLE_CALLBACK_URL') ||
          '/v1/auth/google/callback',
        scope: ['email', 'openid', 'profile'],
        authorizationURL: '/v1/auth/google/redirect',
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
      ) => {
        this.authService.validateUserByGoogleId(profile).then((r) => {
          done(null, r);
        });
      },
    );
  }
}
