import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: `${process.env.MQTT_SERVER}`,
    },
  });

  // await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
