import { Injectable } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL || '/v1/auth/google/callback',
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
