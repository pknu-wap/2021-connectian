import { Controller, Get } from '@nestjs/common';

@Controller({
  path: '/',
})
export class IndexController {
  @Get('/')
  public index() {
    return;
  }
}
