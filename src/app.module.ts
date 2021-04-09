import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TokenBlacklistModule } from './token-blacklist/token-blacklist.module';
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
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
