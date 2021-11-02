import { Controller, Get, Render, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';

@Controller({
  path: '/testing',
})
export class TestController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @Render('test')
  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard)
  public index() {
    return;
  }

  @Get('/profile')
  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard)
  public async getProfile(@Request() req) {
    return {
      user: await this.usersService.findById(req.session.user),
    };
  }
}
