import { ApiProperty } from '@nestjs/swagger';

export class Room {
  constructor(
    title: string,
    lastMessage: string,
    createdAt: Date | number,
    modifiedAt: Date | number,
  ) {
    this.title = title;
    this.lastMessage = lastMessage;
    this.modifiedAt =
      typeof modifiedAt !== 'number' ? modifiedAt : new Date(modifiedAt);
    this.createdAt =
      typeof createdAt !== 'number' ? createdAt : new Date(createdAt);
  }

  public toPrimitive() {
    return {
      ...this,
      modifiedAt: this.modifiedAt.valueOf(),
      createdAt: this.createdAt.valueOf(),
    };
  }

  @ApiProperty()
  title: string;

  @ApiProperty()
  lastMessage: string;

  @ApiProperty({ example: 'number(timestamp)' })
  modifiedAt: Date;

  @ApiProperty({ example: 'number(timestamp)' })
  createdAt: Date;
}

export class Member {
  constructor(nickname: string, color: string) {
    this.nickname = nickname;
    this.color = color;
  }

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  color: string;
}

export class Message {
  constructor(userId: string, message: string, createdAt: Date | number) {
    this.userId = userId;
    this.message = message;
    this.createdAt =
      typeof createdAt !== 'number' ? createdAt : new Date(createdAt);
  }

  public toPrimitive() {
    return {
      ...this,
      createdAt: this.createdAt.valueOf(),
    };
  }

  @ApiProperty()
  userId: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 'number(timestamp)' })
  createdAt: Date;
}

export class SetUserInfoByRoomIdResponseDto {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  member: Member;
}
