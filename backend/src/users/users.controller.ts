import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({
  path: '/users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  public async getUser(@Request() req) {
    return !req.session.user
      ? null
      : await this.usersService.findById(req.session.user);
  }
}
