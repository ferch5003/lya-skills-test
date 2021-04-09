import { Controller, Post, UseGuards } from '@nestjs/common';
import { TokenBlacklistExistGuard } from 'src/guards/token-blacklist-exist.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(TokenBlacklistExistGuard)
  @Post('send')
  sendMessage() {
    const catFact = this.messagesService.getCatFact();
    return catFact;
  }
}
