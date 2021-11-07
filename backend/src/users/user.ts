import { RoleEnum } from '../roles/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Chats {
  @ApiProperty({ nullable: true })
  recentRoom: string | null;

  @ApiProperty({
    description:
      '사용자의 웹소켓 room 목록입니다. key가 room 이름이고 value는 아무 의미 없습니다.',
    example: `{ $roomId: true, ... }`,
  })
  rooms: any;
}

export class UserDetail {
  @ApiProperty()
  age: number;

  @ApiProperty()
  purpose: string;

  @ApiProperty()
  mbti: string;

  @ApiProperty()
  major: string;

  @ApiProperty()
  canAlcohol: boolean;

  @ApiProperty()
  isSmoke: boolean;

  @ApiProperty()
  height: number;
}

export class User {
  constructor(
    displayName: string,
    email: string,
    googleId: string,
    photo: string,
    roles: RoleEnum,
  ) {
    this.displayName = displayName;
    this.email = email;
    this.googleId = googleId;
    this.photo = photo;
    this.roles = roles;
  }

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  googleId: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  roles: RoleEnum;

  @ApiProperty()
  chats: Chats;

  detail: UserDetail;
}
