import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(`lyatest/${process.env.MQTT_CODE}`) 
    ackMessageTestData(@Payload() data: number[], @Ctx() context: MqttContext) {
        return 'Message Received';
    }
}
