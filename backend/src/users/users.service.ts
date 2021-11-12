import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { Profile } from 'passport-google-oauth20';
import { User, UserDetail } from './user';
import { RoleEnum } from '../roles/role.enum';

@Injectable()
export class UsersService {
  private db = database();

  public async findOrCreateByGoogleId(profile: Profile): Promise<string> {
    const rootRef = this.db.ref('/users');
    const ref = await rootRef
      .orderByChild('/googleId')
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

  public async isUserInRoomByUserId(userId: string, roomId) {
    const response = await this.db
      .ref(`/users/${userId}/chats/rooms/${roomId}`)
      .get();
    return response.exists();
  }

  public async findById(userId: string): Promise<User | null> {
    if (!userId) {
      return null;
    } else {
      const rootRef = this.db.ref('/users');
      const ref = await rootRef.child(userId).get();
      const child = ref.val();
      return !child ? null : { ...child, userId };
    }
  }

  public async getPreferences() {
    const ref = await this.db.ref('/enums/preferences').get();
    return ref.val();
  }

  public async getGenders() {
    const ref = await this.db.ref('/enums/genders').get();
    return ref.val();
  }

  public async setUserDetail(userId: string, userDetail: UserDetail) {
    const rootRef = this.db.ref();
    const userDetailRef = rootRef.child(`/users/${userId}/detail`);
    const preferenceRef = await rootRef
      .child(`/enums/preferences/${userDetail.preference}`)
      .get();
    const genderRef = await rootRef
      .child(`/enums/genders/${userDetail.gender}`)
      .get();
    await userDetail.setPreference(preferenceRef.val());
    await userDetail.setGender(genderRef.val());
    for (const [key, value] of Object.entries(userDetail)) {
      if (value !== null) {
        await userDetailRef.child(`/${key}`).set(value);
      }
    }
  }
}
