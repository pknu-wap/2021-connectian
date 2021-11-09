import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: '/',
})
export class IndexController {
  constructor(private configService: ConfigService) {}
  @Get('/')
  @Render('index')
  public index() {
    return {
      env: this.configService.get<string>('NODE_ENV') === 'development',
    };
  }
}
