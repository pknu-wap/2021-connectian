import {
  Controller,
  Get,
  Redirect,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { GoogleGuard } from './google.guard';
import { SessionRecord } from '../session/session';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: '/auth',
})
@ApiTags('auth')
export class AuthController {
  @ApiOperation({
    summary: '구글 oauth 로그인 시작지점',
    description: '로그인 시 여기로 넘겨주세요.',
  })
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
      // +'&prompt=consent',
    };
  }

  @UseGuards(GoogleGuard)
  @Get('/google/callback')
  @Redirect('/')
  public googleCallback(@Request() req, @Session() session: SessionRecord) {
    session.user = req.user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Get('/logout')
  public logout(@Session() session: SessionRecord) {
    session.user = null;
    return;
  }
}
