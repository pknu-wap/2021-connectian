import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionRecord } from '../session/session';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { UserExample } from './user';

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
  @ApiResponse({ type: UserExample })
  @Get('/getUser')
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @UseGuards(RolesGuard)
  public async getUser(@Session() session: SessionRecord) {
    return !session.user
      ? null
      : await this.usersService.findById(session.user);
  }
}
