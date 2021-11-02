import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { Profile } from 'passport-google-oauth20';
import { User } from './user';
import { RoleEnum } from '../roles/role.enum';

@Injectable()
export class UsersService {
  private db = database();

  public async findOrCreateByGoogleId(profile: Profile): Promise<string> {
    const rootRef = this.db.ref().child('/users');
    const ref = await rootRef
      .orderByChild('googleId')
      .equalTo(profile.id)
      .get();
    const child = ref.val();
    if (!child) {
      return (
        await rootRef
          .push(
            new User(
              profile.displayName,
              profile.emails[0].value,
              profile.id,
              profile.photos[0].value,
              RoleEnum.User,
            ),
          )
          .get()
      ).key;
    } else {
      return Object.keys(child)[0];
    }
  }

  public async findById(id: string): Promise<User | null> {
    if (!id) {
      return null;
    } else {
      const rootRef = this.db.ref().child('/users');
      const ref = await rootRef.child(id).get();
      const child = ref.val();
      return !child ? null : child;
    }
  }
}
