import { Controller, Get, Render, Session, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { NodeEnvs } from 'src/config/config.decorator';
import { NodeEnvEnum } from '../config/config.enum';
import { NodeEnvsGuard } from '../config/config.guard';
import { SessionRecord } from '../session/session';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: '/testing',
})
@ApiTags('testing')
export class TestController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @Render('test')
  @Roles(RoleEnum.Admin)
  @NodeEnvs(NodeEnvEnum.DEVELOPMENT)
  @UseGuards(RolesGuard)
  @UseGuards(NodeEnvsGuard)
  public index() {
    return;
  }

  @Get('/profile')
  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard)
  public async getProfile(@Session() session: SessionRecord) {
    return {
      session,
      user: await this.usersService.findById(session.user),
    };
  }
}
