import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionRecord } from '../session/session';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { User, UserDetail } from './user';

@Controller({
  path: '/users',
  version: '1',
})
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '사용자 정보 조회',
  })
  @ApiResponse({ type: User })
  @Get('/getUser')
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @UseGuards(RolesGuard)
  public async getUser(@Session() session: SessionRecord) {
    return !session.user
      ? null
      : await this.usersService.findById(session.user);
  }

  @ApiOperation({
    summary: 'user detail 설정',
  })
  @Post('/setUserDetail')
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @UseGuards(RolesGuard)
  public async setUserDetail(
    @Session() session: SessionRecord,
    @Body() userDetail: UserDetail,
  ) {
    return this.usersService.setUserDetail(session.user, userDetail);
  }
}
