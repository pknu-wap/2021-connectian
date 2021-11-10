import { ApiProperty } from '@nestjs/swagger';

export class PushChatRequestDto {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  message: string;
}
