import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TokenBlacklistModule } from './token-blacklist/token-blacklist.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/lya'),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TokenBlacklistModule,
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: `${process.env.MQTT_URL}`,
          username: `${process.env.MQTT_USERNAME}`,
          password: `${process.env.MQTT_PASSWORD}`,
        }
      },
    ]),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
