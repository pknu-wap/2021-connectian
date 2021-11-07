import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async validateUserByGoogleId(profile: Profile) {
    return await this.usersService.findOrCreateByGoogleId(profile);
  }
}
