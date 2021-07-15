import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Controller('checkout')
export class LokiController implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(
    @Inject('KAFKA_SERVICE')
    private clientKafka: ClientKafka,
  ) {
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('kang');
    this.kafkaProducer = await this.clientKafka.connect();
  }

  @Get()
  async checkout() {
    return await this.kafkaProducer.send({
      topic: 'kang',
      messages: [
        { key: Math.random() + '', value: JSON.stringify({ request: "bana elma verir misin?" }) },
      ],
    });
  }
}
