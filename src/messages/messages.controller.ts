import { Controller, Inject, Post, UseGuards, Request } from '@nestjs/common';
import { TokenBlacklistExistGuard } from 'src/guards/token-blacklist-exist.guard';
import { MessagesService } from './messages.service';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject('MESSAGE_SERVICE') private client: ClientProxy
  ) {}

  @UseGuards(JwtAuthGuard, TokenBlacklistExistGuard)
  @Post('send')
  sendMessage(@Request() req) {
    const catFact = this.messagesService.getCatFact();
    return catFact.pipe(
      map((res) => {
        this.client.emit(`lyatest/${process.env.MQTT_CODE}`, {
          message: res.data.fact,
          user_id: req.user.seqID,
        });
        return res.data;
      })
    );
  }
}
