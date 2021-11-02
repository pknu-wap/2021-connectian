import { Controller, Get, Redirect, Request, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './google.guard';

@Controller({
  version: '1',
  path: '/auth',
})
export class AuthController {
  @UseGuards(GoogleGuard)
  @Get('/google')
  public async googleAuth(@Request() req) {
    return req.user;
  }

  @Get('/google/redirect')
  @Redirect()
  public async googleRedirect(@Request() req) {
    const params = req.url.split('?')[1];
    return {
      url:
        'https://accounts.google.com/o/oauth2/v2/auth?' +
        params +
        '&hd=pukyong.ac.kr',
      // + '&prompt=consent',
    };
  }

  @UseGuards(GoogleGuard)
  @Get('/google/callback')
  @Redirect('/')
  public googleCallback(@Request() req) {
    req.session.user = req.user;
  }

  @Get('/logout')
  public logout(@Request() req) {
    req.session.user = null;
    return;
  }
}
