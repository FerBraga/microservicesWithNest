import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';


const logger = new Logger('Main');

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      noAck: false,
      queue: 'admin-backend'
    }
  });

  logger.log('Microservice is running')

  await app.listen();
}
bootstrap();
