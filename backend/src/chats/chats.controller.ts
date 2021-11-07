import { Controller, Get, Query, Session, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { CreatedPurposeEnum } from './chat.enum';
import { SessionRecord } from '../session/session';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatsByRoomIdResponseExample, Room } from './chats';

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
    summary: '[운영용] room 생성',
    description: 'createdPurpose는 LOVE / LEISURE 있음.',
  })
  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard)
  @Get('/createRoom')
  public async createRoom(
    @Query('title') title: string,
    @Query('createdPurpose') createdPurpose: CreatedPurposeEnum,
  ) {
    return this.chatsService.createRoom(title, createdPurpose);
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
  ) {
    return this.chatsService.addUserToRoom(userId, roomId);
  }

  @ApiOperation({
    summary: 'room의 이전 채팅 목록 조회',
  })
  @ApiResponse({
    type: ChatsByRoomIdResponseExample,
  })
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @UseGuards(RolesGuard)
  @Get('/')
  public async chatsByRoomId(@Query('roomId') roomId: string) {
    return this.chatsService.chatsByRoomId(roomId);
  }
}
