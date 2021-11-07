import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { SessionRecord } from '../session/session';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Room, SetUserInfoByRoomIdResponseDto } from './chats';
import { Chats } from '../users/user';

@Controller({ version: '1', path: '/chats' })
@ApiTags('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: '사용자 속한 개별 room의 상세한 정보 조회' })
  @ApiResponse({ type: Room })
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @UseGuards(RolesGuard)
  @Get('/rooms')
  public async getRoomsByUserId(@Session() session: SessionRecord) {
    return this.chatsService.getRoomsByUserId(session.user);
  }

  @ApiOperation({
    summary: 'room의 이전 채팅 목록 조회',
  })
  @ApiResponse({
    type: Chats,
  })
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @UseGuards(RolesGuard)
  @Get('/')
  public async chatsByRoomId(@Query('roomId') roomId: string) {
    return this.chatsService.chatsByRoomId(roomId);
  }

  @ApiOperation({
    summary: 'room 및 사용자 PURPOSE 리스트',
  })
  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard)
  @Get('/getPurposes')
  public getPurposes() {
    return this.chatsService.getPurposes();
  }

  @ApiOperation({
    summary: 'room별 유저 닉네임, 색 설정',
  })
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @UseGuards(RolesGuard)
  @Post('/setUserInfoByRoomId')
  public setUserInfoByRoomId(
    @Body() responseDto: SetUserInfoByRoomIdResponseDto,
    @Session() session: SessionRecord,
  ) {
    return this.chatsService.setUserInfoByRoomId(
      session.user,
      responseDto.roomId,
      responseDto.member,
    );
  }

  @ApiOperation({
    summary: '[운영용] room 생성',
  })
  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard)
  @Get('/createRoom')
  public async createRoom(
    @Query('title') title: string,
    @Query('purpose') purpose: string,
  ) {
    return this.chatsService.createRoom(title, purpose);
  }

  @ApiOperation({
    summary: '[운영용] 사용자 room에 등록',
  })
  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard)
  @Get('/addUserToRoom')
  public async addUserToRoom(
    @Query('userId') userId: string,
    @Query('roomId') roomId: string,
    @Query('nickname') nickname: string,
  ) {
    return this.chatsService.addUserToRoom(userId, roomId, nickname);
  }
}
