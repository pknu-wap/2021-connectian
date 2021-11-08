import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { SessionRecord } from '../session/session';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: '/events',
})
@ApiTags('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @ApiOperation({
    summary: '웹소켓용 jwt 토큰 발급',
  })
  @ApiResponse({ type: String })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get('/token')
  public getToken(@Session() session: SessionRecord) {
    return this.eventsService.sign(session.user);
  }
}
