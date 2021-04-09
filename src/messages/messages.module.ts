import { HttpModule, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TokenBlacklist,
  TokenBlacklistSchema,
} from 'src/token-blacklist/schemas/token-blacklist.schema';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://catfact.ninja',
    }),
    MongooseModule.forFeature([
      { name: TokenBlacklist.name, schema: TokenBlacklistSchema },
    ]),
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
