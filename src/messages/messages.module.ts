import { HttpModule, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TokenBlacklist,
  TokenBlacklistSchema,
} from 'src/token-blacklist/schemas/token-blacklist.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    HttpModule.register({
      baseURL: 'https://catfact.ninja',
    }),
    MongooseModule.forFeature([
      { name: TokenBlacklist.name, schema: TokenBlacklistSchema },
    ]),
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.MQTT,
        options: {
          protocol: 'mqtt',
          hostname: `${process.env.MQTT_HOSTNAME}`,
          port: +`${process.env.MQTT_PORT}`,
          username: `${process.env.MQTT_USERNAME}`,
          password: `${process.env.MQTT_PASSWORD}`,
        },
      },
    ]),
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
